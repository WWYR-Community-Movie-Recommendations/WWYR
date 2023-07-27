'use strict';

// ***** GLOBALS *****
let userNameLocalStorage ='';
let userArray = [];


// ***** DOM WINDOWS *****
// Get form and all form data by id
let userGreeting = document.getElementById('user-greeting');
let shareMovieForm = document.getElementById('share-movie-form');
let userIDInput = document.getElementById('user-ID');
let videoLinkInput = document.getElementById('video-link');
let movieNameInput = document.getElementById('movie-name');
let movieCommentInput = document.getElementById('user-comment');


// ***** CONSTRUCTOR FUNCTION *****
// Create movie objects
function MovieData (movieName, userComment, videoLink) {
  this.movieName = movieName;
  this.userComment = userComment;
  this.videoLink = videoLink;
}


// ***** HELPER FUNCTIONS / UTILITIES *****
// Update the content of the h2 element with the greeting message
function renderGreeting() {
  userGreeting.textContent = `${userNameLocalStorage} Let the Community Discover Your Pick!`;
}

// Find the index of a user in userArray based on userName and userID
// Returns number of index if found, returns -1 if match not found
function findUserIndex(userName, userID) {
  return userArray.findIndex(function(user) {
    return user.userName === userName && user.userID === userID;
  });
}

// Check if movie URL matches URL matches previously submitted movie url
function findMovieURL(videoLink) {
  return userArray.find(function(user) {
    return user.recommendedMovies.some(function (movie) {
      return movie.videoLink === videoLink;
    });
  });
}

// Check if movie name matches previously submitted movie name
function findMovieTitle(movieName) {
  let movieNameLowerCase = movieName.toLowerCase();

  return userArray.find(function(user) {
    return user.recommendedMovies.some(function (movie) {
      return movie.movieName.toLowerCase() === movieNameLowerCase;
    });
  });
}

// Check if movie trailer is a valid YouTube link
function isValidYouTubeURL(url) {
  // Regular expression to match the YouTube URL pattern
  let youtubeURLRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;

  // Test the URL against the regex pattern
  return youtubeURLRegex.test(url);
}


// ***** EVENT HANDLERS *****
function handleIDInput() {
  // Get current value of the ID input
  let inputValue = userIDInput.value;

  // Check if the value is numeric
  if (isNaN(inputValue)) {
    // If not numeric don't allow typing
    userIDInput.value = '';
  }
}

function handleSubmit(event) {
  event.preventDefault();

  // Retrieve values from user form (html)
  let movieNameValue = event.target.movieName.value;
  let userCommentValue = event.target.userComment.value;
  let videoLinkValue = event.target.videoLink.value;
  let userIDValue = event.target.userID.value;

  // Check if user ID & name matches object pair from userArray
  let userIndex = findUserIndex(userNameLocalStorage, userIDValue);

  // Check if youtube url is a repeat already submitted by another user
  let findMovieLink = findMovieURL(videoLinkValue);

  // Check if name of movie has been used before
  let findMovieName = findMovieTitle(movieNameValue);

  // Make sure all fields filled out by user
  if (
    movieNameValue === '' ||
    userCommentValue === '' ||
    userIDValue === '' ||
    videoLinkValue === ''
  ) {
    alert('Please fill out all the fields.');
    return;
  }

  // If userIndex equals -1, no matching userName and userID were found in local storage
  if (userIndex === -1) {
    alert('Invalid user ID entered. Please check your input and enter your ID number');
    userIDInput.value ='';
    return;
  }

  // Check if movie name or movie link have been sumbitted previously by another user
  if (findMovieName !== undefined || findMovieLink !== undefined) {
    alert('Movie name has already been shared by someone in your community! Please share another movie.');
    movieNameInput.value ='';
    videoLinkInput.value ='';
    movieCommentInput.value ='';

    return;
  }

  // Check if link is a valid youtube url
  if (!isValidYouTubeURL(videoLinkValue)) {
    // Pop-up alert if the videoLink is not a valid YouTube link
    alert('Please enter a valid YouTube video link.');
    return;
  }

  // If everything valid/correct, push movie data object to userArray.recommended movies[]
  let userMovieData = new MovieData(movieNameValue, userCommentValue,videoLinkValue);
  userArray[userIndex].recommendedMovies.push(userMovieData);

  // Update local storage with the new movie data
  localStorage.setItem('users', JSON.stringify(userArray));

  // Reset the form
  event.target.reset();

  alert(`Very nice ${userNameLocalStorage}! Your movie recommendation has been shared!`);
}


// ***** EXECUTABLE CODE *****

// Retrieve current user name from local storage
userNameLocalStorage = localStorage.getItem('userName');

// Render greeting to current user
renderGreeting();

// ***** Check Local Storage and Load into userArray If Any *****
// Retrieve existing user data from local storage (if any) and convert into usable JavaScript data, if no data establish empty array
let existingUsers = JSON.parse(localStorage.getItem('users')) || [];

// Restore userArray with data from local storage (if any)
userArray = existingUsers;

// Add listener to limit user ID to four digits only and ensure numeric value only
userIDInput.addEventListener('input', handleIDInput);

// Add event listener to form 'userForm' where user enters info
shareMovieForm.addEventListener('submit', handleSubmit);
