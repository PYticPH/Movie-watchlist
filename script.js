// Script by PYticPH


let movieArr = []
let movieDB = []
let watchlist = 0

const searchBtn = document.getElementById('search')

document.getElementById('main')
  .addEventListener('click', (e) => {

    const watchlistCounter =
      document.getElementById('watchlist-counter')

    const movieTitle = e.target.dataset.title

    if (movieTitle) {

      const isMovieInDB = movieDB.some(movie => movieTitle === movie.title)

      if (isMovieInDB)
        alert("Movie already added to watchlist")
      else {

        const selectMovie = movieArr
          .filter(movie => movieTitle === movie.title)[0]

        movieDB.push(selectMovie)

        localStorage.setItem('watchlist', JSON.stringify(movieDB))

        watchlist += 1

        watchlistCounter.innerText = watchlist
      }
    }
  })

async function searchMovie() {

  const movieName = document.getElementById('user-input').value

  const req = await fetch(`https://www.omdbapi.com/?apikey=82842744&s=${movieName}`)
  const res = await req.json()

  const movieId = res.Search.map(movie => movie.imdbID)

  fetchMovieById(movieId)

}


async function fetchMovieById(movieId) {

  movieDataArr = []

  document.getElementById('main').innerHTML = ''

  for (id of movieId) {

    const req = await fetch(`https://www.omdbapi.com/?apikey=82842744&i=${id}`)
    const res = await req.json()

    movieObj = (
      {
        poster: res.Poster,
        title: res.Title,
        rating: res.imdbRating,
        runtime: res.Runtime,
        genre: res.Genre,
        plot: res.Plot
      }
    )

    movieArr.push(movieObj)

    listMovie(movieObj)
  }
}

searchBtn.addEventListener('click', searchMovie)


function listMovie(movie) {

  const movieCard = `
      <div class="movie-card">
        <div class="movie-poster-container">
          <img src="${movie.poster}" alt ="movie poster">
        </div>
        <div class="movie-info">
          <div class="top-info">
            <h2>${movie.title}</h2>
            <img src="images/rating.png" alt="rating">
            <span class="rating">${movie.rating}</span>
          </div>
          <div class="middle-info">
            <span class="movie-runtime">${movie.runtime}</span>
            <span class="movie-genre">${movie.genre}</span>
            <button class="add-watchlist" data-title="${movie.title}">
              <img src="images/add.png" alt="add to watchlist">
              Watchlist
            </button>
          </div>
          <p class="movie-plot">
            ${movie.plot}
          </p>
        </div>
      </div>
    `

  document.getElementById('main').innerHTML += movieCard
}

