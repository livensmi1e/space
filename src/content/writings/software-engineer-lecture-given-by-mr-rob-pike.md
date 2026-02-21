---
title: "Software engineer lecture given by Mr. Rob Pike"
date: "2026-02-21"
time: "10:18 PM"
description: ""
tags: ["swe"]
isDraft: true
---

## Table of Contents

## Context

One night, I could not sleep. Maybe I am hungry as I did not eat much in the afternoon. When scrolling youtube videos, I came across a video titled [COMP1531 Week 4 Lecture 2 | Rob Pike and HTTP](https://www.youtube.com/watch?v=SlasmhEcXDo&t=4523s). I thought he was giving talk about HTTP. So curiosity came in and I decided to give it a try.

## Lot of things to learn

He defineds what software engineering is, who is software engineer. He also presented some important characteristics of software engineering (in order in the lecture):

### Correctness

He gave a wonderful example on the problem of summing 3 numbers. At first, we (of course myself) thought it was trivial, what was his point? The program he showed is simple. But he asked: "How do you know it is correct?"

```python
def sum(a, b, c):
    return a + b + c
```

But, `sum(0.5, 0.2, 0.1) = 0.7(9)`, not `0.8`. Of course, I know the reason is floating point number issue, but he definitely had a strong point here. How is even possible, that writing a 3 lines of code program that is obviously correct but is incorrect. So how about writing thousands, millions lines of codes? This turns out that we are missing something called:

### Specification

The problem he gave, write a program that add 3 numbers is missing details. What kind of number? Is it interger? Floating point?... So correctness must be based on specification.

And even interger, it can leads to overflow issue. So the point I understand here is even we have specification, it is not enough. The software must have:

### Reliability