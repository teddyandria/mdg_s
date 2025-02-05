const {Sequelize} = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const {POSTGRES_USER,POSTGRES_PASSWORD, POSTGRES_DB, DB_HOST, DB_PORT} = process.env

const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
    //models: [__dirname + '**/*.entity.js'],
    logging: true
});

module.exports = sequelize;