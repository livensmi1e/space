---
title: "Moving from Echo framework to net/http standard library in Go"
date: "2026-02-18"
time: "10:37 PM"
description: "I realised that I know nothing about Go standard libraries, so I try not to use external frameworks and write code using as much standard libraries as possible to understand what other people say `Go std libs are powerful`"
tags: ["net/http"]
---

## Table of Contents

## Why

My first experience with backend development in Go is with Echo. It is great. But the downside is I understand nothing about the internal things. Because every web framework in go depends on net/http, so I thinked maybe I should learn net/http.

This article only covers the server side of the package, `net/http` also contains code for client side to make request.

## Difficulties

There are serveral challenges, first is what is ServeMux, then what is the different between Handle and HandleFunc, also how to group api routes. My buddy gpt and gemini does a great job guiding me.

## Handlers

Handler is a simple interface defines method to serve http content when a pattern is reached:

```go
type Handler interface {
	ServeHTTP(ResponseWriter, *Request)
}
```

What is `ServeMux`? It is kind of a multiplexer that save routes as a tree structure, match the requested route and call approriate handler function.

We can create new `ServeMux` or use a default one from the library.

```go
// Internal struct
type ServeMux struct {
	mu     sync.RWMutex
	tree   routingNode // Routing tree
	index  routingIndex
	mux121 serveMux121 // I don't understand yet
}
```

On this `ServeMux`, we can register routes with a handler function called `HandleFunc`. A route is defined with path and method, which can be used with path parameter. 

```go
func (h *apiHandler) RegisterRoutes(mux *http.ServeMux) {
	apiMux := http.NewServeMux()
	apiMux.HandleFunc("GET /example", h.helloWorld)
	apiMux.HandleFunc("GET /error", h.giveError)
	apiMux.HandleFunc("POST /auth/register", h.register)
	apiMux.HandleFunc("POST /auth/login", h.login)
	apiMux.Handle("POST /auth/refresh", http.HandlerFunc(h.refresh))
	apiMux.Handle("POST /auth/logout", h.authorize(http.HandlerFunc(h.logout)))
	apiMux.Handle("GET /me", h.authorize(http.HandlerFunc(h.me)))
	mux.Handle("/api/", http.StripPrefix("/api", apiMux))
	mux.Handle("/docs/", httpSwagger.WrapHandler)
}
```

In the above code, we have a mux as an argument, we define a inner mux to handle the app route and then wrap these routes into `/api` route. We can do this nesting because `mux.Handle` accept a `Handler` interface and the mux is basically a `Handler`.

A handler function is a function that have this signature:

```go
type HandlerFunc func(ResponseWriter, *Request)
```

So the function `helloWorld` registered to the mux looks like this:

```go
func (h *apiHandler) helloWorld(w http.ResponseWriter, r *http.Request) {
	respondSuccess(
		w,
		http.StatusOK,
		&rest.ExampleResponseBody{
            Data: service.HelloWord(), 
            StatusCode: http.StatusOK
        },
    )
}
```

After defining mux and registering routes, we have one work to do: define a HTTP Server.

HTTP server will have a handler to handle request, by default it will use the `http.DefaultServeMux`. Its job, as I imagine, is to listen/manage connections from client, then the routing job belongs to the handler.

Let's look at the struct:

```go
// A Server defines parameters for running an HTTP server.
// The zero value for Server is a valid configuration.
type Server struct {
	// Addr optionally specifies the TCP address for the server to listen on,
	// in the form "host:port". If empty, ":http" (port 80) is used.
	// The service names are defined in RFC 6335 and assigned by IANA.
	// See net.Dial for details of the address format.
	Addr string

	Handler Handler // handler to invoke, http.DefaultServeMux if nil

    // Other fields
}
```

After declaring, we run the server by call listen and serve method.

```go
server = newServer(
    withAddr(cfg.HttpServerAddr()),
    withHandler(cors.Default().Handler(handler)),
    withTimeouts(5*time.Second, 10*time.Second, 2*time.Second),
)
server.ListenAndServe()
```

## Magic

This piece of code works just fine:

```go
apiMux.HandleFunc("POST /auth/login", h.login)
apiMux.Handle("POST /auth/refresh", http.HandlerFunc(h.refresh))
```

`HandlerFunc` accept a function that have this signature `func(w http.ResponseWriter, r *http.Request)` while `Handle` accept a `Handler` interface.

And because the `http.HandleFunc` is a type that implements `ServeHTTP`, so it is also considered a `Handler`.

```go
// Internal

// The HandlerFunc type is an adapter to allow the use of
// ordinary functions as HTTP handlers. If f is a function
// with the appropriate signature, HandlerFunc(f) is a
// [Handler] that calls f.
type HandlerFunc func(ResponseWriter, *Request)

// ServeHTTP calls f(w, r).
func (f HandlerFunc) ServeHTTP(w ResponseWriter, r *Request) {
	f(w, r)
}
```

## Future learnings

I would like to spend more time reading the internal code of this package as there is so much thing to learn. Understand even just the logic of the multiplexer is a wonderful achievement for me :)

## Resources

I myself should read these articles:
- https://blog.cloudflare.com/the-complete-guide-to-golang-net-http-timeouts/
- https://blog.birdor.com/go-net-http-internals-deep-dive/
- https://deepwiki.com/cloudflare/go/5.1-http-client-and-server