---
title: "Learn how to code Discord bot"
date: "2025-02-08"
time: "11:55 PM"
description: "What I learn from developing a discord bot to execute source code remotely"
tags: ["discord-bot", "judge0"]
---

## Table of Contents

## Tech

I used Judge0 for Code Execution. This project is wonderful. I just hope that one day I can understand this project thoroughly.

For Discord bot, I use Discord.js which is a wrapper for Discord API, to help making bot easier.

## Projects to learn from

As a beginner, I also found some wonderful repositories to read, understand, learn from them. These are:

-   [anhhung04/teacher_assistant_discord_bot](https://github.com/anhhung04/teacher_assistant_discord_bot)
-   [anhhung04/werewolf-bot](https://github.com/anhhung04/werewolf-bot)
-   [judge0/discord-bot](https://github.com/judge0/discord-bot)
-   [engineer-man/piston-bot](https://github.com/engineer-man/piston-bot)

## Idea

I always like discord embed view, it is actractive, elegant. I also want something cool, like execute code. So this is a good combination.

## Process

First, I found out that if using slash command in discord, it would has better support when typing, because this is a feature specific to Discord. To use slash command (true slash command), we has to register to Discord.

But this is somewhat annoying, and finally I discovered that I can you just message to mimic slash command, just `/some message`. Doing this, the command is treated as normal message and we will do the rest on our own, like parsing command.

I chose a 12 dollar Digital Ocean VPS to host Judge0 because the 4 dollar doesn't has enough RAM (not sure yet). Their docs are nice, but the language info is not correct. A litle tiring of finding the right language id.

## Learned

I learned how to read docs, how to use Redis, Discordjs, Judge0, and learn how to create nice embed in discord, know the logic of making a bot.

## Result

<p><img src="/src/assets/writings/code-exec.png" width="700"></p>

<p><img src="/src/assets/writings/code-stat.png" width="500"></p>
