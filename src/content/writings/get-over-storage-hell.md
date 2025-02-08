---
title: "How I get over storage hell"
date: "2025-01-24"
time: "10:10 AM"
description: "My C Drive becomes red over the past 3 months and I now finally solve it by resetting :)"
tags: ["experience"]
---

## Table of Contents

## Backup plan

First, I needed to do the backup. I transferred all important **files** into my 1T hard drive. Then I listed all the **environments** and **applications** I need to install after resetting. As I haven't has any experience before, all I did is just doing in the hope of success.

## Reset phase

Then it took me a while to figure out how to reset computer. I found out something interesting here. When reseting, Windows doesn't remove old os image, instead it downloads new image, moving the current os image into a folder called `windows.old`. The new image takes up to 5 GB, but at the current time I reset, my C drive only had 2 GB left. I had no choice, only deleting every applications in fear, doing so free up 3 more gigs. So the reset started.

It took quite long time, but finally done. The UI of init the new windows really made my excited. After going through the setup steps, I got into the computer for the first time.

## Recovery phase

As I mentions, I needed to recover 3 main things: data, application and dev environment.

Here is exacly my memor:

> Việc cần làm sau khi reset window
>
> -   Chuyển Download sang ổ D
> -   Tăng font size
> -   Tải apps
> -   Setup môi trường dev
> -   Fix vụ touchpad
> -   Login web apps - bookmark bar
> -   Thiết kế phương án lưu file
> -   Setup vscode
> -   Liên kết git và github
> -   ssh config

> App
>
> -   Docker Deskop
> -   Vscode
> -   Cisco pt
> -   Figma
> -   Obsidian
> -   Wireguard
> -   Zalo

> Environment
>
> -   MSSY2
> -   Node
> -   Go
> -   PHP
> -   Antlr
> -   Java
> -   Python
> -   Git
> -   WSL

I have learned how to extend the C drive. First, go the `Disk Management`, delete the D drive that stays next to C drive. Then extend the C drive. I chose to give it 50 gigs more. Then make new drive and name it D. So now, my C drive capacity is 147 gigs and D is 90 gigs. Awesome!

The next step is installing applications. I carefully inspect the StackOverFlow forum, documentations to make sure that I can change the installation folder into D drive. My D drive now will be divided as:

-   dev: as it name
-   env: storing the binary execution files.
-   apps: storing the installation of applications.

Now let's move to experiement installing these. I only list some that suck me and I have learned new things, the rest is kind of easy to do.

## Application

The one that sucked me most is Docker Desktop.

### Docker Desktop

This part is interesting. First, I have used wsl2 before with Ubuntu distro but I know nothing about it. This is the chance I gets into it a bit (just very little).

As I understand, Docker Desktop on Windows need a Linux environmnet to run containers on. There are two main way of doing so, using Hyper-V and WSL. First former is old and not recommended, the latter is recommended and of course, I do the latter. It seems that is the only way I can do.

At the beginning, WSL is available (I mean command `wsl`) but there is no Linux distro yet. I has to download Linux distro from the internet. This section, I follow a life saving blog post.

```powershell
Invoke-WebRequest -Uri https://aka.ms/wslubuntu2004 -OutFile Ubuntu.appx -UseBasicParsing
```

I don't know why the downloading took so much time (not my internet quality), it seems that the download host has throtted it.

After executing this command, I had a `.appx` folder, so changed to `.zip` and unzipped it.

```powershell
move .\Ubuntu.appx .\Ubuntu.zip
Expand-Archive .\Ubuntu.zip
```

Then if we run `Ubuntu2004.exe`, it will does the installation right the its locaion, creating the `ext4`. This will automatically inform wsl, so no need to register the distro.

Doing some more fancy commands to ensure:

```powershell
wsl -l -all
wsl -s Ubuntu
```

So now, I can call `wsl` to use Ubuntu. Now I installed Docker Desktop. If we double click the install.exe, it won't allow us to choose installation folder, so according to the docs, I had to use cmd.

```cmd
start /w "" "Docker Desktop Installer.exe" install --wsl-default-data-root=<path> --installation-dir=<path>
```

The wsl-default-data-root will result in location for storing the `docker-desktop`, `docker-desktop-data` and `ubuntu`. One thing I don't understand is _what is difference between these_?

### Zalo

Zalo does not allow choosing folder, so the only thing I can do is moving ZaloPC folder (located in `%USERPROFILE%/AppData/Local`) to D drive and then created symlink in cmd:

```bash
mklink /j %USERPROFILE%\AppData\Local\ZaloPC D:\apps\zalo\Zalo
```

Doing so let the apps still access the origin folder but the actual data is stored on new location. Nice to learn this trick.

### VSCode

VSCode let us choose installation folder but the extensions source code is still kept on C drive, at `%USERPROFILE%\.vscode`. So I apply the above trick again.

One thing I don't understand is: according to VSCode docs, we can change the extensions root folder by command:

```bash
code.exe --extensions-dir "D:\apps\vscode\extensions"
```

Unfortunately, nothing changed. I need the answer.

## Environment

### MSYS2

This will give me the gcc, g++ compiler for C/C++ and other useful commands. The docs written really clear so I will skip the installation part. One thing to point out is my first intention is to use this for python and pip, but I cannot run pip, I really don't understand why there is no `pip.exe` in the `usr/bin`.

And it seems that gcc can compile cpp file.

### Python

I choose to install on GUI, so as to ensure I can choose location. The env path for python is `python/3.12.8` and for pip is `python/3.12.8/Scripts`.

### Go

Go let us choose install folder. But one thing here is `GOPATH` env variable. By default, it is under `%USERPROFILE/go` but I move it out of C drive. _I dont understand what it is, how it is used_.

### PHP

First time installing this failed because it says runtime.vdc is not suitable. I tried to fix by install another verson but does not works. Finally I download another C++ Runtime Distributable 2015-2022 and it works. _Even don't understand what that is_.

### NodeJs

Hmm, on thing to note is running `npm` is now allow. Why? Because the ExecutionPolicy on Powershell is strict and it does not allow exec any supicous script. So after reading the docs and ask ChatGPT, the safe option is to switch to RemoteSigned.

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
```

### Git

Install Git is easy but one thing is a black box for me is connect it to Github Account. Now I know that there is 3 way to connect git to github

-   Password based (Stopped since 2021)
-   SSH
-   Access token

I chose SSH. because I have backup the `.ssh` folder so the key pair is still there. I just need to put it into `%USERPROFILE%` and everything works fine (also put the public key on Github). From now on, every private repo I has to clone via SSH.

Fancy command to test auth status:

```bash
ssh -T git@github.com
```

## Result

![Result of setup environment](readme/src/assets/writings/result.png)

So many questions but I have learned a lot. Ah, and one more thing, the touchpad works well. Because of this event, I know the it 's not physically damaged, the root is error in driver I2C HID Driver.
