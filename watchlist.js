
let movieDB = JSON.parse(localStorage.getItem('watchlist'))

const main = document.getElementById('main')

main.innerHTML = ''

main.addEventListener('click', (e) => {

  //const title = e.target.dataset.title
  const poster = e.target.dataset.poster

  if (poster) {

    movieDB = movieDB.filter(movie => movie.poster !== poster)
    main.innerHTML = ''

    isWatchlistEmpty()

    movieDB.length > 0 ?
      localStorage.setItem('watchlist', JSON.stringify(movieDB)) :
      localStorage.removeItem('watchlist')
  }
})


function isWatchlistEmpty() {

  if (movieDB === null || !movieDB.length) {

    main.innerHTML =
      `
        <div class="empty-watchlist-info">
          <p>Your watchlist is looking a little empty...</p>
          <a href="index.html">
            <img src="images/add.png" alt="add a movie"> Let's add some movies!
          </a>
        </div>
      `
  }
  else {

    movieDB.forEach(movie => listMovie(movie))
  }

}


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
              data-poster="${movie.poster}"
              aria-label="remove movie">
              <img src="images/remove.png" alt="add to watchlist">
              Remove
            </span>
          </div>
          <p class="movie-plot">
            ${movie.plot}
          </p>
        </div>
      </div>
    `

  main.innerHTML += movieCard
}

isWatchlistEmpty()
