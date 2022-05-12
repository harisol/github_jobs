# GitHub Jobs

A simple single page web application. This repository consists 
- Client: React Application that is bootstrapped with create-react-app template<br/>
- Server: Node.js server using Express.js, PostgreSQL, Sequelize ORM, JSON Web Tokens, Jest testing framework  

Sucsessfully tested with Node.js v16.13.1

## Install Server  
- go to `api` directory
- copy file `env.example` to `.env`  
- fill your configuration in file `.env`  
- run `npm install`  
- run `npm run migrate` to import database schema

## Install Client  

- Go to `client` directory then run `npm install`  
- Set `proxy` in file `client/package.json` with your Server host to avoid CORS error when connecting your Server and Client. This `proxy` only has effect in development. In production, you must set `jobApiBaseUrl` in `{project_root}/client/src/utils/config.js`

## Running Client

On the `client` directory, run `npm start`

## Running Server
On the `api` directory, run `npm start`  
