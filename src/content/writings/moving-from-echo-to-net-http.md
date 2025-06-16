---
title: "Moving from Echo framework to net/http standard library in Go"
date: "2025-06-15"
time: "9:16 PM"
description: "I realised that I know nothing about Go standard libraries, so I try not to use external frameworks and write code using as much standard libraries as possible to understand what other people say `Go std libs are powerful`"
tags: ["net/http"]
---

## Table of Contents

## Why

My first experience with backend development in Go is with Echo. It is great. But the downside is I understand nothing about the internal things. Because every web framework in go depends on net/http, so I thinked maybe I should learn net/http.

## Difficulties

There are serveral challenges, first is what is ServeMux, then what is the diff bwt Handle and HandleFunc, also how to group api routes. My buddy gpt and gemini does a great job guiding me.

## The strategy

To learn, i just don't watch some yt videos, I actually dev a project call `kanboard`. It is just a kanban board web application like Jira boards, GitHub project board. The reason why I chose this because instead of simple to-do app, I want something more interactive, and clearly the drag and drop effect in the boards excites me. So I have chances to practice both frontend and backend. Don't be confused, my goal is not a full stack engineer, I just want to have basic knowledge about frontend development to make my ideas become true on my own.

This post hasn't finished yet. I still keep updates when I have time. Cheer.

One day later, I am back! I wonder that this post should focus only on net/http or my full exprerience deving the kanboard. Hmm, I don't know. Maybe I should put it in a separate section.

## Beside net/http

Beside net/http, i have learned other things. The first thing is using go migrate cli tool to manage database migrations. Just write the up/down sql schema with version like `001_title.up.sql` and running the cli command. The This library support both cli and go library, but I think because later on I will manage infra on aws and terraform, it's better to use versioned db and cli to automate the ci.
