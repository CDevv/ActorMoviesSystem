const { Actor } = require('../models/actor')

async function createActor(name, birthDate) {
   const newActor = await Actor.create({
        name, birthDate
   }) 
   return newActor.id
}

async function getActors() {
    const actors = Actor.findAll()
    return actors
}

async function getActor(id) {
    const actor = Actor.findOne({ 
        where: {id}
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
}

async function deleteActor(id) {
    await Actor.destroy({
        where: {id}
    })
}

module.exports = { createActor, getActors, getActor, updateActor, deleteActor }