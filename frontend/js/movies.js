import { addItemDOM, fetchData, createItem, editItem, deleteItem, toggleVisibility, createAssociation, fetchItem, editItemDOM, getCurrentState, editItemTitleDOM } from './utils.js'

const baseURL = 'http://localhost:3000/api/movies'

function addMovieDOM(movie) {
    addItemDOM(document.getElementById('movies-list'), {
        id: movie.id,
        title: movie.title,
        date: movie.releaseDate,
        associations: movie.Actors
    }, {
        onDelete: deleteMovie,
        onAssociation: onActorAdded,
        addAssociationTitle: 'Add Actor'
    })
}

function onActorAdded(parent, actor) {
    const actorItem = document.createElement('li')
    actorItem.innerHTML = `${actor.name} (${actor.ActorMovies.role})`
    parent.appendChild(actorItem)
}

async function loadData() {
    await fetchData(baseURL, (movie) => addMovieDOM(movie))
    await fetchData('http://localhost:3000/api/actors', (actor) => {
        const container = document.getElementById('association-id')
        const actorOption = document.createElement('option')
        actorOption.value = actor.id
        actorOption.innerHTML = actor.name

        container.appendChild(actorOption)
    })
}

async function createMovie(title, releaseDate) {
    await createItem(baseURL, {
        title, releaseDate
    }, (movie) => {
        addMovieDOM(movie)
    })
}

async function editMovie(id, title, releaseDate) {
    await editItem(`${baseURL}/${id}`, {
        title, releaseDate
    }, (movie) => editItemTitleDOM(id, movie.title, movie.releaseDate))
}

async function deleteMovie(id) {
    await deleteItem(`${baseURL}/${id}`, () => {
        const container = document.getElementById('movies-list')
        const movie = document.getElementById(`item-${id}`)
        container.removeChild(movie)
    })
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log('dom content')
    await loadData()

    const submitForm = document.getElementById('movie-submit-form')
    const movieTitle = document.getElementById('movie-title')
    const movieReleaseDate = document.getElementById('movie-release-date')

    submitForm.addEventListener('submit', async (ev) => {
        ev.preventDefault()
        await createMovie(movieTitle.value, new Date(movieReleaseDate.value).getTime())
    })

    const editForm = document.getElementById('edit-form')
    const editMovieTitle = document.getElementById('edit-movie-title')
    const editMovieReleaseDate = document.getElementById('edit-movie-release-date')

    editForm.addEventListener('submit', async (ev) => {
        ev.preventDefault()
        await editMovie(getCurrentState().editAction, editMovieTitle.value, new Date(editMovieReleaseDate.value).getTime())
    })

    const associationForm = document.getElementById('association-form')
    const associationId = document.getElementById('association-id')
    const associationRole = document.getElementById('association-role')

    associationForm.addEventListener('submit', async (ev) => {
        ev.preventDefault()
        await createAssociation({
            actorId: associationId.value, 
            movieId: getCurrentState().associationAction,
            role: associationRole.value 
        }, async (actorMovie) => {
            toggleVisibility(document.getElementById('association-form'))
            const movie = await fetchItem(`${baseURL}/${getCurrentState().associationAction}`)
            editItemDOM(getCurrentState().associationAction, {
                title: movie.title,
                date: movie.releaseDate,
                associations: movie.Actors
            }, onActorAdded)
        })
    })
})