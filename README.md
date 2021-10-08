**The University of Melbourne**

# COMP30026 - IT Project

## Table of contents

- [COMP30026 - IT Project](#comp30026---it-project)
  - [Table of contents](#table-of-contents)
  - [Team Members](#team-members)
  - [General Info](#general-info)
  - [Packages](#packages)
      - [Backend](#backend)
      - [Frontend](#frontend)
  - [Installation step](#installation-step)
  - [Start server](#start-server)
  - [Start client](#start-client)
  - [Start client and server concurrently](#start-client-and-server-concurrently)
  - [Prettier](#prettier)
  - [dotenv Variables](#dotenv-variables)

## Team Members

| Name                   |
| :--------------------- |
| Maggie Wang            |
| Feifan Zeng            |
| Samantha Min Syuen Goh |
| Jun Li Chen            |
| Jeongwoo Seo           |

## General Info

A personal CRM

## Packages

#### Backend

-   `axios`
-   `bcrypt`
-   `concurrently`
-   `cors`
-   `dotenv`
-   `express`
-   `react`
-   `jsonwebtoken`
-   `mongoose`
-   `passport`
-   `passport-jwt`
-   `passport-local`
-   `jest`
-   `nodemon`
-   `prettier`
-   `supertest`

#### Frontend

-   `@date-io/moment`
-   `@fortawesome/fontawesome-svg-core`
-   `@fortawesome/free-regular-svg-icons`
-   `@fortawesome/free-solid-svg-icons`
-   `@fortawesome/react-fontawesome`
-    `@material-ui/core`
-   `@material-ui/pickers`
-   `@testing-library/jest-dom`
-   `@testing-library/react`
-   `@testing-library/user-event`
-   `axios`
-   `jwt-decode`
-   `moment`
-   `react`
-   `react-beautiful-dnd`
-   `react-big-calendar`
-   `react-dom`
-   `react-helmet`
-   `react-modal`
-   `react-moment`
-   `react-router-dom`
-   `react-scripts`
-   `validator`
-   `web-vitals`
-   `eslint-plugin-react`

## Installation step

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
REACT_APP_BACKEND_API_URL=http://localhost:3001
REACT_APP_FRONTEND_URL=http://localhost:3000
```
