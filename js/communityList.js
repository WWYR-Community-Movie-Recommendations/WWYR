'use strict';

// ***** GLOBALS *****
let userNameLocalStorage ='';
let userArray = [];
let movieArray = [];


// ***** DOM WINDOWS *****
let userGreeting = document.getElementById('user-greeting');
// Get parent container to append the movies
let movieContainer = document.getElementById('movie-container');
let sortButton = document.getElementById('sort-button');
// Get the value of the selected option from the dropdown
let sortDropdown = document.getElementById('sort-dropdown');


// ***** HELPER FUNCTIONS / UTILITIES *****

// Update the content of the h2 element with the greeting message
function renderGreeting() {
  userGreeting.textContent = `${userNameLocalStorage}, Check Out The Full List of Movies Shared By The Community!`;
}


// Check local storage and load user data and userArray
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

// Render Movie List from computer (only from other users not self)
function renderMovies() {

  movieContainer.innerHTML = ''; // Clear any existing content

  for (let i = 0; i < movieArray.length; i++) {
    let movieContributor = movieArray[i].userName;
    let movieTitle = movieArray[i].movieName;
    let movieComment = movieArray[i].userComment;
    let movieLink = movieArray[i].videoLink;
    // Convert the YouTube URL to an embed URL
    let embedURL = convertToEmbedURL(movieLink);

    if (movieContributor !== userNameLocalStorage) {

      // Create div to house video container and movie details append to movieContainer (master parent)
      let movieTrailerAndDetailContainer = document.createElement('div');
      movieTrailerAndDetailContainer.setAttribute('id', 'movie-trailer-detail-container');
      movieContainer.appendChild(movieTrailerAndDetailContainer);

      // Create div with id 'video-container' and append to movieTrailerAndDetailContainer
      let videoContainer = document.createElement('div');
      videoContainer.setAttribute('id', 'video-container');
      movieTrailerAndDetailContainer.appendChild(videoContainer);

      // Create iframe element and append to div videoContainer
      let videoiFrame = document.createElement('iframe');
      videoiFrame.setAttribute('id', 'video-iframe');
      videoiFrame.setAttribute('class', 'youtube-videos');
      videoiFrame.setAttribute('width', '560');
      videoiFrame.setAttribute('height', '315');
      videoiFrame.setAttribute('title', 'YouTube video player');
      videoiFrame.setAttribute('frameborder', '0');
      videoiFrame.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      videoiFrame.setAttribute('allowfullscreen', '');
      videoContainer.appendChild(videoiFrame);

      // Set the src attribute of the iframe to the embed URL
      videoiFrame.src = embedURL;

      // Create section element and append to div movieContainer (master parent)
      let filmDetails = document.createElement('section');
      filmDetails.setAttribute('id', 'film-details');
      movieTrailerAndDetailContainer.appendChild(filmDetails);

      // Create p element and append to sec filmDetails
      let movieDetailTitle = document.createElement('p');
      movieDetailTitle.setAttribute('id', 'title-of-film');
      movieDetailTitle.setAttribute('class', 'movie-details');
      movieDetailTitle.textContent = 'Movie Title:  ';
      filmDetails.appendChild(movieDetailTitle);

      // Create <span> element, append to <p> element, output name of movie title
      let filmTitleText = document.createElement('span');
      filmTitleText.setAttribute('id', 'title-of-film-text');
      movieDetailTitle.appendChild(filmTitleText);
      filmTitleText.textContent = movieTitle;
      filmTitleText.style.fontWeight = 'normal';

      // Create p element and append to sec filmDetails
      let movieDetailComment = document.createElement('p');
      movieDetailComment.setAttribute('id', 'title-of-film');
      movieDetailComment.setAttribute('class', 'movie-details');
      movieDetailComment.textContent = 'Movie Comment:  ';
      filmDetails.appendChild(movieDetailComment);

      // Create <span> element, append to <p> element, output name of movie comment
      let commentMovieText = document.createElement('span');
      commentMovieText.setAttribute('id', 'movie-comment-text');
      movieDetailComment.appendChild(commentMovieText);
      commentMovieText.textContent = `"${movieComment}"`;
      commentMovieText.style.fontWeight = 'normal';
      commentMovieText.style.fontStyle = 'italic';

      // Create p element and append to sec filmDetails
      let movieDetailContributor = document.createElement('p');
      movieDetailContributor.setAttribute('id', 'title-of-film');
      movieDetailContributor.setAttribute('class', 'movie-details');
      movieDetailContributor.textContent = 'Contributor Name:  ';
      filmDetails.appendChild(movieDetailContributor);

      // Create <span> element, append to <p> element, output name of contributor
      let contributorName = document.createElement('span');
      contributorName.setAttribute('id', 'contributor-text');
      movieDetailContributor.appendChild(contributorName);
      contributorName.textContent = movieContributor;
      contributorName.style.fontWeight = 'normal';
    }

  }

}


// Convert url into embeddable format by extracting videoID from Youtube URL
function convertToEmbedURL(youtubeURL) {

  // Split URL by '?v=' to get the video ID and timestamp
  let videoIDWithTimeStamp = youtubeURL.split('v=')[1];

  // Split video ID and timestamp by '&t=' to get video ID only
  let videoID = videoIDWithTimeStamp.split('&t=')[0];

  // Construct the embed URL with the video ID
  let embedURL = `https://www.youtube.com/embed/${videoID}`;

  return embedURL;

}


// ***** EVENT HANDLER(S) *****

function handleSortButton() {
  let sortOption = sortDropdown.value;

  // Sort the movieArray based on the selected option
  if (sortOption === 'username') {

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
    //localeCompare ensures sorting is done correctly for strings in different languages or locales. Instead of just using movieArray.sort()
    movieArray.sort((a, b) => a.userName.localeCompare(b.userName));
  } else if (sortOption === 'movietitle') {
    movieArray.sort((a, b) => a.movieName.localeCompare(b.movieName));

  }

  // Render sorted movie list
  renderMovies();
}

// ***** EXECUTABLE CODE *****

loadUserData();

loadMovieArray();

renderGreeting();

renderMovies();

sortButton.addEventListener('click', handleSortButton);
