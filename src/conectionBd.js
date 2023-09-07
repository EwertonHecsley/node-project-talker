require('dotenv').config();
const knex = require('knex');

const knexInstance = {
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE
    }
};

const conection = knex(knexInstance);

module.exports = conection