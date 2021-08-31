**The University of Melbourne**

# COMP30026 - IT Project

## Table of contents

- [COMP30026 - IT Project](#comp30026---it-project)
  - [Table of contents](#table-of-contents)
  - [Team Members](#team-members)
  - [General Info](#general-info)
  - [Packages](#packages)
  - [Installation step](#installation-step)
  - [Start server](#start-server)
  - [Start client](#start-client)
  - [Start client and server concurrently](#start-client-and-server-concurrently)
  - [Prettier](#prettier)
  - [dotenv Variables](#dotenv-variables)
  - [Implemented Backend API](#implemented-backend-api)

## Team Members

| Name                   | Task |
| :--------------------- | ---: |
| Maggie Wang            |      |
| Feifan Zeng            |      |
| Samantha Min Syuen Goh |      |
| Jun Li Chen            |      |
| Jeongwoo Seo           |      |

## General Info

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

## Packages

-   `express`
-   `react`
-   `dotenv`
-   `passport`
-   `passport-local`
-   `passport-jwt`
-   `jsonwebtoken`
-   `bcrypt`
-   `mongoose`
-   `prettier` (also has a vscode extension)

Client
- `npm i --save @fortawesome/fontawesome-svg-core`
- `npm install --save @fortawesome/free-solid-svg-icons`
- `npm install --save @fortawesome/react-fontawesome`
- `npm install --save @fortawesome/free-regular-svg-icons`

## Installation step

_Hopefully this is correct_

-   `git clone <repo>`
-   `cd <repo>`
-   `npm install` (install server packages)
-   `cd client`
-   `npm install` (install client packages)

## Start server

-   `npm start` (in root folder)

## Start client

-   `cd client`
-   `npm start`

## Start client and server concurrently

-   `npm run dev` (in root folder)

You may need to install concurrently, if so, run the following command

-   `npm install -g concurrently`

## Prettier

-   `npx prettier --write .`

## dotenv Variables

If running locally, please create a `.env` file in the root folder and copy the following code into it.

```
MONGO_URL=mongodb+srv://comp30022:comp30022@ctrl-alt-elite.ys2d9.mongodb.net/it-project?retryWrites=true&w=majority
SECRET_KEY=boba milk tea
SALT=10
```

## Implemented Backend API

| Method | Route                          |                   Function |
| :----- | :----------------------------- | -------------------------: |
| POST   | `/api/account/signup`          |        (Admin) Create user |
| GET    | `/api/account/login`           |                 Login user |
| GET    | `/api/users`                   |      (Admin) Get all users |
| GET    | `/api/users/:uid`              |         (Admin) Get a user |
| POST   | `/api/users/:uid/edit`         |        (Admin) Edit a user |
| POST   | `/api/users/:uid/remove`       |      (Admin) Remove a user |
| GET    | `/api/tags`                    |               Get all tags |
| GET    | `/api/tags/:tid`               |                  Get a tag |
| POST   | `/api/tags/create`             |       (Admin) Create a tag |
| POST   | `/api/tags/:tid/edit`          |         (Admin) Edit a tag |
| POST   | `/api/tags/:tid/remove`        |       (Admin) Remove a tag |
| GET    | `/api/clients`                 |    (Admin) Get all clients |
| POST   | `/api/clients`                 |     Get all user's clients |
| GET    | `/api/clients/:cid`            |               Get a client |
| POST   | `/api/clients/create`          |            Create a client |
| POST   | `/api/clients/:cid/addNote`    |            Add client note |
| POST   | `/api/clients/:cid/removeNote` |         Remove client note |
| POST   | `/api/clients/:cid/edit`       |              Edit a client |
| POST   | `/api/clients/:cid/remove`     |            Remove a client |
| GET    | `/api/activities`              | (Admin) Get all activities |
| POST   | `/api/activities`              |  Get all user's activities |
| GET    | `/api/activities/:aid`         |            Get an activity |
| POST   | `/api/activities/create`       |         Create an activity |
| POST   | `/api/activities/:aid/edit`    |           Edit an activity |
| POST   | `/api/activities/:aid/remove`  |         Remove an activity |
| GET    | `/api/orders`                  |     (Admin) Get all orders |
| POST   | `/api/orders`                  |      Get all user's orders |
| GET    | `/api/orders/:oid`             |               Get an order |
| POST   | `/api/orders/create`           |            Create an order |
| POST   | `/api/orders/:oid/edit`        |              Edit an order |
| POST   | `/api/orders/:oid/remove`      |            Remove an order |
