const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/sequelize')

const Actor = sequelize.define('Actor', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    birthDate: {
        type: DataTypes.INTEGER
    }
}, {timestamps: false})

module.exports = {Actor}