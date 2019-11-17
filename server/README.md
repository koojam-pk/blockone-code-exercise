# Server

---
A RestAPI server to simulate the operations for retrieving a user's bank accounts, account transactions and fund transfers. For simplicity, the service will serves a single mocked user.

The server is written with Node.js and Express as the HTTP middleware. It uses PostgreSQL for data persistency and the database is resided in [Heroku: Cloud Application Platform](https://www.heroku.com)

## Getting Started

---
To install dependencies,

    > npm install

  or

    > yarn install

To start the Server in development mode run,

    > npm run dev:start

  or
  
    > yarn run dev:start

## Development

---
Nodemon is used to monitor for any changes in the source code and automatically restart the service. It support local and global configuration files. The configuration file name is named `nodemon.json` and located in the current working folder or in home folder.

See the section about [Config files](https://github.com/remy/nodemon#config-files) for more information.

##### package.json

Add the following code to `package.json`:

    ...
      "scripts": {
        "start": "node index.js",
        "dev:start": "nodemon index.js"
      },
    ...

The server resides in the server folder and its project structure is as followed:

    server/
      ├──controllers/ # Server logic
      ├──migrations/  # Database migrations
      ├──models/      # Database related functionality
      ├──routes/      # Server endpoints
      ├──seeders/     # Database test data
      ├──services/    # Database connection service
      ├──nodemon.json # Nodemon configuration file
      └──index.js     # Main entry point

##### Setup database tables and test data**

To run database migrations, use the command:

    > npx sequelize-cli db:migrate
To rollback (undo) migrations, run the following:

    > npx sequelize-cli db:migrate:undo
Seeding the database with test data (run all seeds):

    > npx sequelize-cli db:seed:all
To undo the most recent seed:

    > npx sequelize-cli db:seed:undo
Alternatively, to undo all seeds:

    > npx sequelize-cli db:seed:undo:all

See the section about [Migrations](https://sequelize.org/master/manual/migrations.html) for more information.
