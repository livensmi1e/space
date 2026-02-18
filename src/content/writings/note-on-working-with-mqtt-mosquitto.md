---
title: "Setup mqtt broker Mosquitto"
date: "2025-03-16"
time: "10:43 PM"
description: ""
tags: ["mqtt"]
---

## Table of Contents

## Docker

### Set up

Mosquitto MQTT broker will be hosted on docker container.

First prepare compose file:

```yml
services:
  mosquitto-broker:
    image: eclipse-mosquitto:2.0.21
    ports:
      - "1883:1883"
    volumes:
      - ./mosquitto.conf:/mosquitto/config/mosquitto.conf
      - /etc/mosquitto/pwfile:/mosquitto/config/pwfile
```

On the host machine, create password file:

```bash
touch /etc/mosquitto/pwfile
chmod 604 /etc/mosquitto/pwfile
```

Also create config file `mosquitto.conf`:

```bash
allow_anonymous false
password_file /mosquitto/config/pwfile
listener 1883 0.0.0.0
```

Although allow anonymous is false, this still authorize any connections to broker.

Now start service `docker compose up -d`.

Goes into container and create a user:

```bash
docker exec -it <container_id> sh
```

```sh
mosquitto_passwd -c /mosquitto/config/pwfile <username_1>

mosquitto_passwd /mosquitto/config/pwfile <username_2>
```

This will prompt for password.

The `-c` option is for create new file and override any file on that location.

### Test

On the client machine, test connection:

```bash
mosquitto_pub -h <broker-address> -u <username> -P <password> -t <topic> -m "Hi"
```

And voila!

## Windows

### Setup

1. Download on offical website, the download includes mosquitto broker daemon, mosquitto pub/sub client binary, mosquitto password utility to manage credentials.

2. Open `mosquitto.conf`, add following configs

```bash
allow_anonymous false
listener 1883 localhost
password_file C:\mosquitto\pwfile
```

3. On Powershell/CMD, run

```bash
mosquitto_passwd -c C:\mosquitto\pwfile <username>
```

This will prompt for password, then, the file `C:\mosquitto\pwfile` will be created if not exist. It will have this format: `username:password_hash`.

4. Restart daemon

- On CMD (Admin):

```bash
net stop mosquitto
net start mosquitto
```

- On Powwershell:

```bash
stop-service mosquitto
start-service mosquitto
get-service mosquitto
```

Then, we can use with localhost.
