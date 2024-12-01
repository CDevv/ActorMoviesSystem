const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/sequelize')

const { Actor } = require('./actor')
const { Movie } = require('./movie')

const ActorMovie = sequelize.define('ActorMovies', {
    actorId: {
        type: DataTypes.INTEGER,
        references: {
            model: Actor, key: 'id'
        },
        field: 'actorId'
    },
    movieId: {
        type: DataTypes.INTEGER,
        references: {
            model: Movie, key: 'id'
        },
        field: 'movieId'
    },
    role: {
        type: DataTypes.STRING
    }
}, {timestamps: false})

Movie.belongsToMany(Actor, { through: 'ActorMovies', foreignKey: 'movieId' });
Actor.belongsToMany(Movie, { through: 'ActorMovies', foreignKey: 'actorId' });

module.exports = {ActorMovie}