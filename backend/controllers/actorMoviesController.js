const { ActorMovie } = require('../models/actorMovies')

async function createAssociation(actorId, movieId, role) {
    const actorMovie = await ActorMovie.create({
        actorId, movieId, role
    })
    return actorMovie
}

async function getAssociation(actorId, movieId, role) {
    const actorMovie = await ActorMovie.findOne({
        where: {actorId, movieId, role}
    })
    return actorMovie
}

async function deleteAssociation(actorId, movieId, role) {
    await ActorMovie.destroy({
        where: {actorId, movieId, role}
    })
}