import { addItemDOM, fetchData, createItem, editItem, deleteItem, toggleVisibility, createAssociation, fetchItem, editItemDOM, getCurrentState, editItemTitleDOM } from './utils.js'

const baseURL = 'http://localhost:3000/api/actors'

function addActorDOM(actor) {
    addItemDOM(document.getElementById('actors-list'), {
        id: actor.id, 
        title: actor.name, 
        date: actor.birthDate,
        associations: actor.Movies
    }, {
        onDelete: deleteActor,
        onAssociation: onMovieAdded,
        addAssociationTitle: 'Add Movie'
    })
}

function onMovieAdded(parent, movie) {
    const movieItem = document.createElement('li')
    movieItem.innerHTML = `${movie.title} (${movie.ActorMovies.role})`
    parent.appendChild(movieItem)
}

async function loadData() {
    await fetchData(baseURL, (actor) => addActorDOM(actor))
    await fetchData('http://localhost:3000/api/movies', (movie) => {
        const container = document.getElementById('association-id')
        const movieOption = document.createElement('option')
        movieOption.value = movie.id
        movieOption.innerHTML = movie.title

        container.appendChild(movieOption)
    })
}

async function createActor(name, birthDate) {
    await createItem(baseURL, {
        name, birthDate
    }, (actor) => {
        addActorDOM(actor)
    })
}

async function editActor(id, name, birthDate) {
    await editItem(`${baseURL}/${id}`, {
        name, birthDate
    }, (actor) => editItemTitleDOM(actor.id, actor.name, actor.birthDate))
}

async function deleteActor(id) {
    await deleteItem(`${baseURL}/${id}`, () => {
        const container = document.getElementById('actors-list')
        const actor = document.getElementById(`item-${id}`)
        container.removeChild(actor)
    })
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log('dom content')
    await loadData()

    const submitForm = document.getElementById('actor-submit-form')
    const actorName = document.getElementById('actor-name')
    const actorBirthDate = document.getElementById('actor-birth-date')

    submitForm.addEventListener('submit', async (ev) => {
        ev.preventDefault()
        await createActor(actorName.value, new Date(actorBirthDate.value).getTime())
    })

    const editForm = document.getElementById('edit-form')
    const editActorName = document.getElementById('edit-actor-name')
    const editActorBirthDate = document.getElementById('edit-actor-birth-date')

    editForm.addEventListener('submit', async (ev) => {
        ev.preventDefault()
        await editActor(getCurrentState().editAction, editActorName.value, new Date(editActorBirthDate.value).getTime())
    })

    const associationForm = document.getElementById('association-form')
    const associationId = document.getElementById('association-id')
    const associationRole = document.getElementById('association-role')

    associationForm.addEventListener('submit', async (ev) => {
        ev.preventDefault()
        await createAssociation({
            actorId: getCurrentState().associationAction, 
            movieId: associationId.value,
            role: associationRole.value 
        }, async (actorMovie) => {
            toggleVisibility(document.getElementById('association-form'))
            const actor = await fetchItem(`${baseURL}/${getCurrentState().associationAction}`)
            editItemDOM(getCurrentState().associationAction, {
                title: actor.name,
                date: actor.birthDate,
                associations: actor.Movies
            }, onMovieAdded)
        })
    })
})