// Populate dropdown menu with all the available genres
const populateGenreDropdown = (genres) => {
  const select = document.getElementById("genres");

  for (const genre of genres) {
    let option = document.createElement("option");
    option.value = genre.id;
    option.text = genre.name;
    select.appendChild(option);
  }
};

// Returns the current genre selection from the dropdown menu
const getSelectedGenre = () => {
  const selectedGenre = document.getElementById("genres").value;
  return selectedGenre;
};

// Displays the like and dislike buttons on the page
const showBtns = () => {
  const btnDiv = document.getElementById("likeOrDislikeBtns");
  btnDiv.removeAttribute("hidden");
};

// Clear the current movie from the screen
const clearCurrentMovie = () => {
  const moviePosterDiv = document.getElementById("moviePoster");
  const movieTextDiv = document.getElementById("movieText");
  moviePosterDiv.innerHTML = "";
  movieTextDiv.innerHTML = "";
};

// After liking a movie, clears the current movie from the screen and gets another random movie
const likedMovies = [];
const likeMovie = () => {
  let currentLiked = document.getElementById("movieTitle").innerHTML;
  console.log(likedMovies);
  likedMovies.push(`<br> - ${currentLiked}`);
  // convert object to JSON string using JSON.stringify()
  const jsonObject = JSON.stringify(likedMovies);
  // save to localStorage
  sessionStorage.setItem("movies", jsonObject);
  clearCurrentMovie();
  showRandomMovie();
};

// After disliking a movie, clears the current movie from the screen and gets another random movie
const dislikeMovie = () => {
  clearCurrentMovie();
  showRandomMovie();
};

// Create HTML for movie poster
const createMoviePoster = (posterPath) => {
  const moviePosterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;

  const posterImg = document.createElement("img");
  posterImg.setAttribute("src", moviePosterUrl);
  posterImg.setAttribute("id", "moviePoster");

  return posterImg;
};

// Create HTML for movie title
const createMovieTitle = (title) => {
  const titleHeader = document.createElement("h1");
  titleHeader.setAttribute("id", "movieTitle");
  titleHeader.innerHTML = title;

  return titleHeader;
};

// Create HTML for movie overview
const createMovieOverview = (overview) => {
  const overviewParagraph = document.createElement("p");
  overviewParagraph.setAttribute("id", "movieOverview");
  overviewParagraph.innerHTML = overview;

  return overviewParagraph;
};

//Create movie release date
const createMovieReleaseDate = (release_date) => {
  const releaseDate = document.createElement("h3");
  releaseDate.setAttribute("id", "releaseDate");
  releaseDate.innerHTML = release_date;

  return releaseDate;
};

// Returns a random movie from the first page of movies
const getRandomMovie = (movies) => {
  const randomIndex = Math.floor(Math.random() * movies.length);
  const randomMovie = movies[randomIndex];
  return randomMovie;
};

// Uses the DOM to create HTML to display the movie
const displayMovie = (movieInfo) => {
  const moviePosterDiv = document.getElementById("moviePoster");
  const movieTextDiv = document.getElementById("movieText");
  const likeBtn = document.getElementById("likeBtn");
  const dislikeBtn = document.getElementById("dislikeBtn");

  // Create HTML content containing movie info
  const moviePoster = createMoviePoster(movieInfo.poster_path);
  const titleHeader = createMovieTitle(movieInfo.title);
  const overviewText = createMovieOverview(movieInfo.overview);
  const releaseDateBox = createMovieReleaseDate(
    `Release date: ${movieInfo.release_date}`
  );

  // Append title, poster, and overview to page
  moviePosterDiv.appendChild(moviePoster);
  movieTextDiv.appendChild(titleHeader);
  movieTextDiv.appendChild(releaseDateBox);
  movieTextDiv.appendChild(overviewText);

  showBtns();
  likeBtn.onclick = likeMovie;
  dislikeBtn.onclick = dislikeMovie;
};
// get the JSON string from sessionStorage
const str = sessionStorage.getItem("movies");
// convert JSON string to valid object
const likedMoviesArray = JSON.parse(str);
console.log(likedMoviesArray);
