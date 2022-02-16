# TMS_Auth

> TMS Auth App is a project built with nodejs, expressjs & mongodb atlas.
## Features

Done :

- API Security (NoSQL Injections, XSS Attacks, http param pollution etc)

What we must do:

- Authentication with JWT

- Login (User/Admin)
## Requirement

- Node.js V10 or higher.
- MongoDB Atlas.## Configuration File

Rename the `.env.example` to `.env`, then modify to your environment variables, mongodb `uri`, `port` and all environment variables.

   Check on `.env.example`. If the variables are corrects :

   ```console
   cp .env.example .env
   ```
## Installation and start web server

1. Start the project on local

Install all npm dependecies

```console
npm install  or yarn
```

Install nodemon globally

```console
npm install -g nodemon or yarn global add nodemon
```

```console
yarn start
```
