# BlockOne Code Exercise

---
A demo project that implements UI to access a backend service to manage bank accounts. The accounts will support credit facilities.

## Dependencies

---
The frontend web app requires the following dependencies to build and develop:

- Node
- NPM or YAM

The backend service provides the web application with API endpoints is built with Node.js. A PostgreSQL database is used for the persistence layer. The database is sitted at Heroku free service.

## Getting Started

---
To run the demo in a development environment, you can start web app and the backend service in separate terminal instances.

## Installation

---
Start the terminal application in Mac computer or Command Prompt program in Windows computer.

At the prompt, navigate to the where source code folder and type the below command to install the dependencies for Server and Client.

    > npm install

**Backend service**
Start a new terminal session if require, navigate to server source code folder and run the below to command,

    > cd ./server
    > npm run dev:start

The server will initiate a connection to the PostgreSQL database in the Heroku free service.

**Web App**
Navigate to ./client in a separate terminal session, type the below command to start the application.

    > cd ./client
    > npm start

## Testing

---
Test scripts for client can be run with the following command:

    > npm test
