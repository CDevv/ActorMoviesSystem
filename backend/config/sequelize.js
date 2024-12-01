const { Sequelize } = require("sequelize");

let sequelize

if (process.env.NODE_ENV === 'test') {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:'
    });
} else {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: 'db.sqlite'
    });
}

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = {sequelize, testConnection}