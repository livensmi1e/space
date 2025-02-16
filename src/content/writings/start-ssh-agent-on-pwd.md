---
title: "Basic SSH Agent on Powershell"
date: "2025-02-16"
time: "10:59 PM"
description: "These are my notes to use ssh agent on powershell because I need agent forward feature when use ssh"
tags: ["antlr4"]
---

## Table of Contents

## Commands

### Get status

```bash
Get-Service -Name ssh-agent
```

### Change startup type

```bash
Set-Service -Name ssh-agent -StartupType Manual
```

### Start service

```bash
Start-Service -Name ssh-agent
```

### Add ssh public key to agent

```bash
ssh-add path/to/ssh_public_key

ssh-add -L
```

### Check Github

```bash
ssh -T git@github.com
```

I will get `Hi your-username! You've successfully authenticated, but GitHub does not provide shell access.`

Then configure `./ssh/config` to use forward agent and finally ssh to the server.
