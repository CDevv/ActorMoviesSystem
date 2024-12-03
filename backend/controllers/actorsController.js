const { Actor } = require('../models/actor')
const { Movie } = require('../models/movie')
const { ActorMovie } = require('../models/actorMovies')

async function createActor(name, birthDate) {
   const newActor = await Actor.create({
        name, birthDate
   }) 
   return newActor
}

async function getActors() {
    const actors = Actor.findAll({ include: [
        {
            model: Movie,
            through: {
                attributes: ['role']
            }
        }
    ] })
    return actors
}

async function getActor(id) {
    const actor = Actor.findOne({ 
        where: {id},
        include: [{
            model: Movie,
            through: {
                attributes: ['role']
            }
        }]
     })
    return actor
}

async function updateActor(id, name, birthDate) {
    await Actor.update(
        { name, birthDate },
        {
            where: { id }
        }
    )
    const updatedActor = await getActor(id)
    return updatedActor
}

async function deleteActor(id) {
    await ActorMovie.destroy({
        where: {actorId: id}
    })
    await Actor.destroy({
        where: {id}
    })
}

module.exports = { createActor, getActors, getActor, updateActor, deleteActor }