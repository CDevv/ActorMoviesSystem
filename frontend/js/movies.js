function addMovieDOM(name, releasedate)
{
    const moviesList = document.getElementById('movies-list')

    const movie = document.createElement('div')
    movie.className = 'bg-gray-900 p-4 rounded-lg'

    const movieName = document.createElement('h1')
    movieName.className = 'text-xl'
    movieName.innerHTML = name
    movie.appendChild(movieName)

    const movieReleaseDate = document.createElement('p')
    movieReleaseDate.innerHTML = `Released on: ${new Date(releasedate * 1000).toDateString()}`
    movie.appendChild(movieReleaseDate)

    moviesList.appendChild(movie)
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('dom content')
    addMovieDOM('Example Movie', 1732981050)
})