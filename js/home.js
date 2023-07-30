'use strict';

// ***** GLOBALS *****
let userNameLocalStorage ='';
let userArray = [];
let movieArray = [];
// Variable to keep track of previous random index, prevent repeat movie recommendations
let prevRandomNumber = null;





// ***** DOM WINDOWS *****
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

// Update the content of the h2 element with the greeting message
function renderGreeting() {
  userGreeting.textContent = `Welcome ${userNameLocalStorage}! Here is your recommended movie!`;
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

// Convert url into embeddable format
function convertToEmbedURL(youtubeURL) {
  // Extract the video ID from the YouTube URL

  // Split URL by '?v=' to get the video ID and timestamp
  let videoIDWithTimeStamp = youtubeURL.split('v=')[1];
  // Split video ID and timestamp by '&t=' to get video ID only
  let videoID = videoIDWithTimeStamp.split('&t=')[0];


  // Construct the embed URL with the video ID
  let embedURL = `https://www.youtube.com/embed/${videoID}`;

  return embedURL;
}

function renderRandomMovie() {

  let randomNumber;
  let randomMovieContributor;

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

  // console.log('This is movie link:', randomMovieLink);

  // Convert the YouTube URL to an embed URL
  let embedURL = convertToEmbedURL(randomMovieLink);

  // Set the src attribute of the iframe to the embed URL
  videoTrailer.src = embedURL;

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

// Retrieve current user name from local storage
userNameLocalStorage = localStorage.getItem('userName');

// Render greeting to current user
renderGreeting();

// ***** Check Local Storage and Load into userArray If Any *****
// Retrieve existing user data from local storage (if any) and convert into usable JavaScript data, if no data establish empty array
let existingUsers = JSON.parse(localStorage.getItem('users')) || [];

// Restore userArray with data from local storage (if any)
userArray = existingUsers;

// Load movieArray with movie data from userArray
loadMovieArray();
console.log(movieArray);

renderRandomMovie();

// Add event listener to button 'get-movie'
getMovieButton.addEventListener('click', handleGetMovie);

