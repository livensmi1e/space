---
title: "Setup mqtt broker Mosquitto"
date: "2025-03-16"
time: "10:43 PM"
description: ""
tags: ["mqtt"]
---

## Table of Contents

## Setup

Mosquitto MQTT broker will be hosted on docker container.

First prepare compose file:

```docker
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

## Test

On the client machine, test connection:

```bash
mosquitto_pub -h <broker-address> -u <username> -P <password> -t <topic> -m "Hi"
```

And voila!
