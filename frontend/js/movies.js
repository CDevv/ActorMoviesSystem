function addMovieDOM(title, releasedate)
{
    const moviesList = document.getElementById('movies-list')

    const movie = document.createElement('div')
    movie.className = 'bg-gray-900 p-4 rounded-lg'

    const movieTitle = document.createElement('h1')
    movieTitle.className = 'text-xl'
    movieTitle.innerHTML = title
    movie.appendChild(movieTitle)

    const movieReleaseDate = document.createElement('p')
    movieReleaseDate.innerHTML = `Released on: ${new Date(releasedate).toDateString()}`
    movie.appendChild(movieReleaseDate)

    moviesList.appendChild(movie)
}

async function fetchData() {
    const res = await fetch('http://localhost:3000/api/movies/')
    const movies = await res.json()

    for (const movie of movies) {
        addMovieDOM(movie.title, movie.releaseDate)
    }
}

async function createMovie(title, releaseDate) {
    const res = await fetch('http://localhost:3000/api/movies/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title, releaseDate
        })
    })
    const movie = await res.json()

    if (movie !== null) {
        console.log(movie)
        addMovieDOM(title, releaseDate)
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log('dom content')
    await fetchData()

    const submitForm = document.getElementById('movie-submit-form')
    const movieTitle = document.getElementById('movie-title')
    const movieReleaseDate = document.getElementById('movie-release-date')

    submitForm.addEventListener('submit', async (ev) => {
        ev.preventDefault()
        await createMovie(movieTitle.value, new Date(movieReleaseDate.value).getTime())
    })
})