'use strict';

// ***** GLOBALS *****
let userNameLocalStorage ='';
let userArray = [];
let movieArray = [];
// Variable to keep track of previous random index, prevent repeat movie recommendations
let prevRandomNumber = null;


// ***** DOM WINDOWS *****
let movieDetailsContainer = document.getElementById('movie-details-container');
let userGreeting = document.getElementById('user-greeting');
let getMovieButton = document.getElementById('get-movie-button');
let videoTrailer = document.getElementById('video-iframe');
let titleOfFilmText = document.getElementById('title-of-film-text');
let movieCommentText = document.getElementById('movie-comment-text');
let contributorText = document.getElementById('contributor-text');


// ***** HELPER FUNCTIONS / UTILITIES *****

// Generate random numbers for product array
function randomIndexGenerator() {
  return Math.floor(Math.random() * movieArray.length);
}


// Update content of h2 element with greeting message if no movies shared yet message, or a recommended movie
function renderGreeting() {
  if (
    movieArray.length === 0 ||
    movieArray.every(movie => movie.userName === userNameLocalStorage) ) {

    userGreeting.textContent = `Welcome ${userNameLocalStorage}! Your community hasn't shared any movies yet! Be the first to contribute by sharing a movie. Click on the 'Share a Movie' button to get started!`;
    userGreeting.style.fontWeight = 'normal';

  } else {
    userGreeting.textContent = `Welcome ${userNameLocalStorage}! Here is your recommended movie!`;
  }
}


// Function to check local storage and load user data and userArray
function loadUserData() {
  // Retrieve existing user data from local storage (if any) and convert into usable JavaScript data, if no data establish empty array
  let existingUsers = JSON.parse(localStorage.getItem('users')) || [];

  // Restore userArray with data from local storage (if any)
  userArray = existingUsers;

  // Retrieve current user name from local storage
  userNameLocalStorage = localStorage.getItem('userName');
}


// Load movie objects from userArray into movieArray
function loadMovieArray() {

  // Iterate through each user in userArray
  for (let i = 0; i < userArray.length; i++) {
    let user = userArray[i];

    // Within each user, iterate through recommendedMovie array of each user and push to movieArray
    for (let j = 0; j < user.recommendedMovies.length; j++) {
      let movie = user.recommendedMovies[j];
      movieArray.push(movie);
    }
  }
}


// Ouput random movie from other users only, not self
function renderRandomMovie() {
  let randomNumber;
  let randomMovieContributor;

  // If no movies present in movieArray clear html content
  if (
    movieArray.length === 0 ||
    movieArray.every(movie => movie.userName === userNameLocalStorage)
  ) {

    movieDetailsContainer.innerHTML = ''; // Clear any existing content
    return;

  // Fix bug to prevent do while loop from running when only one movie present in movieArray from other user
  } else if (
    movieArray.length === 1 &&
    movieArray[0].userName !== userNameLocalStorage
  ) {

    let onlyMovieTitle = movieArray[0].movieName;
    let onlyMovieComment = movieArray[0].userComment;
    let onlyMovieLink = movieArray[0].videoLink;
    let onlyMovieContributor = movieArray[0].userName;

    // Set the src attribute of the iframe to the embed URL
    videoTrailer.src = onlyMovieLink;

    // Output h2 element with name of movie title
    titleOfFilmText.textContent = onlyMovieTitle;
    titleOfFilmText.style.fontWeight = 'normal';

    // Ouput p element with movie comment
    movieCommentText.textContent = `"${onlyMovieComment}"`;
    movieCommentText.style.fontWeight = 'normal';
    movieCommentText.style.fontStyle = 'italic';

    // Output p element with contributor name
    contributorText.textContent = onlyMovieContributor;
    contributorText.style.fontWeight = 'normal';
    return;

  }

  // Ensure movies presented are only from other users, not self. Also prevents repeat movie recommendation twice in a row.
  do {
    randomNumber = randomIndexGenerator();
    randomMovieContributor = movieArray[randomNumber].userName;
  } while (
    randomMovieContributor === userNameLocalStorage ||
    randomNumber === prevRandomNumber
  );

  prevRandomNumber = randomNumber; // Update the previous random index

  let randomMovieTitle = movieArray[randomNumber].movieName;
  let randomMovieComment = movieArray[randomNumber].userComment;
  let randomMovieLink = movieArray[randomNumber].videoLink;

  // Set the src attribute of the iframe to the embed URL
  videoTrailer.src = randomMovieLink;

  // Output h2 element with name of movie title
  titleOfFilmText.textContent = randomMovieTitle;
  titleOfFilmText.style.fontWeight = 'normal';

  // Ouput p element with movie comment
  movieCommentText.textContent = `"${randomMovieComment}"`;
  movieCommentText.style.fontWeight = 'normal';
  movieCommentText.style.fontStyle = 'italic';

  // Output p element with contributor name
  contributorText.textContent = randomMovieContributor;
  contributorText.style.fontWeight = 'normal';

}

// ***** EVENT HANDLERS *****
function handleGetMovie() {
  renderRandomMovie();
}


// ***** EXECUTABLE CODE *****

loadUserData();

loadMovieArray();

renderGreeting();

renderRandomMovie();

// Add event listener to button 'get-movie'
getMovieButton.addEventListener('click', handleGetMovie);
