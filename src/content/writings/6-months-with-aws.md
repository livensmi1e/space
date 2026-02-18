---
title: "6 months with AWS"
date: "2025-09-27"
time: "20:13 PM"
description: "For the past 6 months, I have had a chance to learn/work with AWS, my first cloud provider platform. Note that I am not favor of this infra or another like GCP, Azure. I just note for myself (and probably you) on using AWS, things I have learned. I guess the valuable point after reading this article is general concepts, ideas on cloud environments."
tags: ["cloud"]
isDraft: true
---

## Table of Contents

## CLI

I have completely no idea about this. All I do is blindly copying and following the tutorials/docs. I don't understand what is

- `credentials` file
- `config` file

When writing this article, I have a chance to read more about this. And this is what I found.

Before we can use AWS CLI tool, we have to authenticate against AWS. There are some ways to do it.

- SSO: We need `config` file. The credentials file is not used for this authentication method.
- Short-term credentials: Need `aws_access_key_id`, `aws_secret_access_key` and `aws_session_token` in `crendentials` file along with `config` file for storing profile configuarations.
- Long-term credentials: Same as short-term except don't use `aws_session_token`.

**Setup SSO:**

```bash
aws configure sso
```

It will prompts for:

- SSO Start URL, SSO Region, SSO Account ID, SSO Role Name, Profile name

After filling all the informations, a file named `config` will be created inside `.aws` directory.

Checking the file, we can see:

```bash
[default]
sso_session = your-sso-session
sso_account_id = id
sso_role_name = role-to-assumed

[sso-session nuoa-io]
sso_start_url = start-url
sso_region = us-east-1
sso_registration_scopes = sso:account:access
```

After this, we can use `aws sso login --profile profile-name` to request crendentials from IAM Identity Center Server. In this case, `profile-name` can be ommited because of `default`. There is a browser pops up. Finally, I can use CLI to interact with resources.

**Long/short-term crendentials:** Not experience yet :)

Useful resources:

- https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html
- https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html#sso-configure-profile-token-auto-sso

## IAM

My understandings:

- There are concepts of `identity` (User, Role, Account) and `resource` (S3, Lambda Function,...)
- A policy is a statement that define: **who (identity)** can do **which (action)** to **what (resource)**.
- There is identity-based policy which defines that policy can do which action to what resource and resourced-based policy which defines who can do which action to it.
- Policy uses implicit DENY to all action, we can explicitly ALLOW or DENY. Explicit DENY is useful for example when we allow all but one specific identity.

## Lambda

Integration

API Gateway

## OpenSearch Service

Domain

Index

Search

API

Security
