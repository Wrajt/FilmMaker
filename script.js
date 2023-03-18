const tmdbKey = "9c7293481a5b52e0781f74604b5ee4b3";
const tmdbBaseUrl = "https://api.themoviedb.org/3";
const playBtn = document.getElementById("playBtn");

const getGenres = async () => {
  let genreRequestEndpoint = "/genre/movie/list";
  let requestParams = `?api_key=${tmdbKey}`;
  let urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;
  try {
    let response = await fetch(urlToFetch);
    if (response.ok) {
      let jsonResponse = await response.json();
      if (jsonResponse && typeof jsonResponse === "object") {
        let genres = jsonResponse.genres;
        return genres; // added return statement
      } else {
        console.error("Response is not valid JSON.");
      }
    } else {
      console.error("Response not OK.");
    }
  } catch (error) {
    console.error(error);
  }
};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  let discoverMovieEndpoint = "/discover/movie";
  const requestParams = `?api_key=${tmdbKey}&withGenres=${selectedGenre}`;
  let urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;
  try {
    let response = await fetch(urlToFetch);
    if (response.ok) {
      let jsonResponse = await response.json();
      let movies = jsonResponse.results;
      return movies;
    }
  } catch (error) {
    console.error(error);
  }
};

const getMovieInfo = async (movie) => {
  let movieId = movie.id;
  let movieEndpoint = `/movie/${movieId}`;
  let requestParams = `?api_key=${tmdbKey}`;
  let urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;
  try {
    let response = await fetch(urlToFetch);
    if (response.ok) {
      let movieInfo = await response.json();
      return movieInfo;
    }
  } catch (error) {
    console.error(error);
  }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById("movieInfo");
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  }
  getMovies();
  const movies = await getMovies();
  const randomMovie = getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  displayMovie(info);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;
