const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/sequelize')

const Movie = sequelize.define('Movie', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING
    },
    releaseDate: {
        type: DataTypes.INTEGER
    }
}, {timestamps: false})

module.exports = {Movie}