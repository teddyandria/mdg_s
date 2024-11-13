// import dotenv from 'dotenv';
// import Sequelize from 'sequelize';
const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const {POSTGRES_USER,POSTGRES_PASSWORD, POSTGRES_DB, DB_HOST, DB_PORT} = process.env

const sequelize = new Sequelize(`postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DB_HOST}:${DB_PORT}/${POSTGRES_DB}`);

module.exports = sequelize;