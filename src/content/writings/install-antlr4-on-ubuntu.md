---
title: "How to install antlr4 on Ubuntu 22.04"
date: "2025-02-16"
time: "10:48 PM"
description: "I asked GPT and followed it, so I want to take note these steps"
tags: ["antlr4"]
---

## Table of Contents

## Motive

I want to test my assignment on Linux environment, so I used a VPS on Digital Ocean. I am very bad at installing things, software and clis. So I asked GPT for help.

## Steps

### Install Python and Pip

```bash
sudo apt update
sudo apt install python3 python3-pip -y
```

### Install Java JRE 11

Note: This version of Antlr4 needs Java 11, not Java 8

```bash
apt install openjdk-11-jre -y
```

### Install ANTLR 4.9.2

```bash
cd /usr/local/lib
sudo wget https://www.antlr.org/download/antlr-4.9.2-complete.jar

echo 'export ANTLR_JAR="/usr/local/lib/antlr-4.9.2-complete.jar"' >> ~/.bashrc
source ~/.bashrc

echo $ANTLR_JAR
```

### Install Python runtime for antlr4

```bash
pip install antlr4-python3-runtime==4.9.2

pip3 show antlr4-python3-runtime
```
