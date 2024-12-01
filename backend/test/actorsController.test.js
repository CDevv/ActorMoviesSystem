const { sequelize, testConnection } = require('../config/sequelize.js')
const { defaultTables } = require('../config/sqlite.js')
const { createActor, getActor, getActors, updateActor, deleteActor } = require('../controllers/actorsController.js')

const { Actor } = require('../models/actor.js')

async function createExampleTables() {
    await Actor.create({name: 'John', birthDate: Date.now() / 1000})
    await Actor.create({name: 'Alex', birthDate: Date.now() / 1000})
}

beforeAll(async () => {
    await sequelize.sync({ force: true });
    await testConnection()
    defaultTables()
    await createExampleTables()
});

afterEach(async () => {
    await Actor.destroy({where: {id: 3}})
})

test('createActor', () => {
    return createActor('John', Date.now() / 1000).then((data) => {
        expect(data).toBeDefined()
    })
})

test('getActor', () => {
    return getActor(1).then((data) => {
        expect(data).not.toBeNull()
        expect(data.id).toBe(1)
    })
})

test('getActors', () => {
    return getActors().then((data) => {
        expect(data.length).toBe(2)
    })
})

test('updateActor', () => {
    return updateActor(1, 'Ivan', Date.now()).then((data) => {
        expect(data).not.toBeNull()
        expect(data.name).toBe('Ivan')
    })
})

test('deleteActor', () => {
    return deleteActor(2).then((data) => {
        expect(data).toBeUndefined()
    })
})