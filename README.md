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
  - [dotenv Variables](#dotenv-variables)
  - [Implemented Backend API](#implemented-backend-api)

## Team Members

| Name | Task |
| :---         |          ---: |
| Maggie Wang     |     |
| Feifan Zeng      |     |
| Samantha Min Syuen Goh    |     |
| Jun Li Chen    |     |
| Jeongwoo Seo    |     |

## General Info
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

## Packages
* `express`
* `react`
* `dotenv`
* `passport`
* `passport-local`
* `passport-jwt`
* `jsonwebtoken`
* `bcrypt`
* `mongoose`

## Installation step
*Hopefully this is correct*
- `git clone <repo>`
- `cd <repo>`
- `npm install` (install server packages)
- `cd client`
- `npm install` (install client packages)

## Start server
- `npm start` (in root folder)

## Start client
- `cd client`
- `npm start`

## dotenv Variables
If running locally, please create a `.env` file in the root folder and copy the following code into it.
```
MONGO_URL=mongodb+srv://comp30022:comp30022@ctrl-alt-elite.ys2d9.mongodb.net/it-project?retryWrites=true&w=majority
SECRET_KEY=boba milk tea
SALT=10
```

## Implemented Backend API
| Method | Route |
| :---         | :---         |
|POST | `/api/account/signup` |
|GET  | `/api/account/login` |
|GET  | `/api/users` |
