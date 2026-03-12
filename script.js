// Script by PYticPH

let movieArr = []
let movieDB = []

let watchlistCount = 0

const watchlistCounterEl = document.getElementById('watchlist-counter')
const searchBtn = document.getElementById('search')


function countWatchlist() {

  const watchlist = JSON.parse(localStorage.getItem('watchlist'))

  if (watchlist !== null) {

    watchlist.forEach(movie => movieDB.push(movie))

    if (movieDB.length > 0) {

      watchlistCount = movieDB.length
    }
  }

  watchlistCounterEl.innerText = watchlistCount
}


document.getElementById('main')
  .addEventListener('click', (e) => {

    const title = e.target.dataset.title
    const runtime = e.target.dataset.runtime

    if (title && runtime) {

      const isMovieInDB =
        movieDB.some(movie => movie.title === title && movie.runtime === runtime)

      if (isMovieInDB)
        alert("Movie already added to watchlist")
      else {

        const selectMovie = movieArr
          .filter(movie => movie.title === title && movie.runtime === runtime)[0]

        movieDB.push(selectMovie)

        localStorage.setItem('watchlist', JSON.stringify(movieDB))

        watchlistCount += 1

        watchlistCounterEl.innerText = watchlistCount
      }
    }
  })

async function searchMovie() {

  const movieName = document.getElementById('user-input').value

  const req = await fetch(`https://www.omdbapi.com/?apikey=82842744&s=${movieName}`)
  const res = await req.json()
  const data = res

  if (data.Response === 'True') {

    const movieId = data.Search.map(movie => movie.imdbID)

    fetchMovieById(movieId)
  }
  else {

    main.innerHTML =
      `<p class="error-text">
          Unable to find what you're looking <br>for.
          Please try another search.
        </p>
      `
  }

}


async function fetchMovieById(movieId) {

  document.getElementById('main').innerHTML = ''

  for (id of movieId) {

    const req = await fetch(`https://www.omdbapi.com/?apikey=82842744&i=${id}`)
    const res = await req.json()

    const movieObj = (
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
            <span 
              class="add-watchlist"
              data-title="${movie.title}"
              data-runtime="${movie.runtime}"
              aria-label="add to watchlist">
              <img src="images/add.png" alt="add to watchlist">
              Watchlist
            </span>
          </div>
          <p class="movie-plot">
            ${movie.plot}
          </p>
        </div>
      </div>
    `

  document.getElementById('main').innerHTML += movieCard
}

countWatchlist()
