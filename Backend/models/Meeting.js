// models/Meeting.js

const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Meeting = sequelize.define('Meeting',{
    id : {
        type : DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
    },
    date : {
        type :DataTypes.DATE,
        allowNull : false,
    },
    slots : {
        type : DataTypes.INTEGER,
        allowNull : false,
    },
    bookedSlots : {
        type: DataTypes.INTEGER,
        allowNull : false,
        defaultValue : 0,
    }
});

module.exports =  Meeting;