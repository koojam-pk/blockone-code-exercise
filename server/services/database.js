const Sequelize = require('sequelize');
const pg = require('pg');
pg.defaults.ssl = true;

const sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPWD,
  {
    host: process.env.DBHOST,
    port: process.env.DBPORT || 5432,
    dialect: 'postgres',
    define: { timestamps: true },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }        
  });

module.exports = sequelize;