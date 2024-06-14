# Hungry Cat.

The cat is hungry. This Discord bot will provide suggestions on what to feed the hungry cat.

### What is this?

Hungry Cat is a Discord bot running on AWS Lambda. The bot relies on slash commands and outgoing webhooks to invoke the lambda function to respond to queries. The Lambda function is configured with a function URL which is provided as an outgoing webhook to Discord bot config.

### Project structure

This is a standard AWS CDK project. The infra is defined under `lib/` directory. The Lambda source code is under `src/` directory. The entry point for lambda is `src/index.ts`.

### Getting started

Pre-requisites:

* Node.js 18+ installed
* AWS access configured.


1. Install CDK

```bash
npm install aws-cdk
```

2. Boot stap CDK

```bash
npx cdk bootstrap
```

3. Create the function & deploy the code

```bash
npx cdk deploy
```