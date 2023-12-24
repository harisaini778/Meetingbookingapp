// config/database.js

const {Sequelize} = require('sequelize');

const sequelize = new Sequelize("meeting_app","root","mysql123",{
    host : "localhost",
    dialect : "mysql",
});

module.exports = sequelize;