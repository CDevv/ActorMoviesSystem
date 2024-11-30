const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/sequelize')

const { Actor } = require('./actor')
const { Movie } = require('./movie')

const ActorMovie = sequelize.define('ActorMovies', {
    actorId: {
        type: DataTypes.INTEGER
    },
    movieId: {
        type: DataTypes.INTEGER
    },
    role: {
        type: DataTypes.STRING
    }
}, {timestamps: false})

Movie.belongsToMany(Actor, { through: 'ActorMovies' });
Actor.belongsToMany(Movie, { through: 'ActorMovies' });

module.exports = {ActorMovie}