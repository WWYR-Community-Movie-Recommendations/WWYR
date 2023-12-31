'use strict';

// ***** GLOBALS *****
let userNameLocalStorage ='';
let userArray = [];
let movieArray = [];
let watchedMovieArray = [];


// ***** DOM WINDOWS *****
let userGreeting = document.getElementById('user-greeting');
// Get parent container to append the movies
let movieContainer = document.getElementById('movie-container');
let sortButton = document.getElementById('sort-button');
// Get the value of the selected option from the dropdown
let sortDropdown = document.getElementById('sort-dropdown');


// ***** CONSTRUCTOR FUNCTION *****
// Create watched movie objects to be re-used to add the watchedMoviesArray
function WatchedMovieData (movieId, watched) {
  this.movieId = movieId;
  this.watched = watched;
}

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

// Render Movie List from computer (only from other users not self), no movies from community shared, display message
function renderMovies() {

  movieContainer.innerHTML = ''; // Clear any existing content

  if ( movieArray.length === 0 || movieArray.every(movie => movie.userName === userNameLocalStorage) ) {
    let message = `${userNameLocalStorage}, no movies have been shared by the community yet!`;
    displayNoRecommendationsMessage(message);
  } else {

    for (let i = 0; i < movieArray.length; i++) {
      let movieContributor = movieArray[i].userName;
      let movieTitle = movieArray[i].movieName;
      let movieComment = movieArray[i].userComment;
      let movieLink = movieArray[i].videoLink;
      let movieGenre = movieArray[i].genre;

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
        videoiFrame.src = movieLink;

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
        let genreDetail = document.createElement('p');
        genreDetail.setAttribute('id', 'genre-of-film');
        genreDetail.setAttribute('class', 'movie-details');
        genreDetail.textContent = 'Genre:  ';
        filmDetails.appendChild(genreDetail);

        // Create <span> element, append to <p> element, output name of movie comment
        let genreText = document.createElement('span');
        genreText.setAttribute('id', 'genre-text');
        genreDetail.appendChild(genreText);
        genreText.textContent = movieGenre;
        genreText.style.fontWeight = 'normal';

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

        // Create <div> for check box input
        let checkBoxContainer = document.createElement('div');
        checkBoxContainer.setAttribute('id', 'checkbox-container');
        filmDetails.appendChild(checkBoxContainer);

        let checkboxLabel = document.createElement('label');
        // checkboxLabel.htmlFor = `watched-label-${i}`; // Assign unique ID to each label
        checkboxLabel.classList.add('watched-label'); // Add class for styling purpose
        checkboxLabel.textContent = 'Marked as watched ';
        checkboxLabel.style.fontWeight = 'normal';

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `watched-checkbox-${i}`; // Assign unique ID to each checkox
        checkbox.classList.add('watched-checkbox'); // Add class for styling purpose

        checkbox.addEventListener('change', handleWatchedCheckboxChange); // Add event listener

        checkBoxContainer.appendChild(checkboxLabel);
        checkBoxContainer.appendChild(checkbox);
      }

    }
  }
}

// Render Movie List from computer (only from other users not self)
function renderMoviesOfSelf() {

  movieContainer.innerHTML = ''; // Clear any existing content

  for (let i = 0; i < movieArray.length; i++) {
    let movieContributor = movieArray[i].userName;
    let movieTitle = movieArray[i].movieName;
    let movieComment = movieArray[i].userComment;
    let movieLink = movieArray[i].videoLink;
    let movieGenre = movieArray[i].genre;

    if (movieContributor === userNameLocalStorage) {

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
      videoiFrame.src = movieLink;

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
      let genreDetail = document.createElement('p');
      genreDetail.setAttribute('id', 'genre-of-film');
      genreDetail.setAttribute('class', 'movie-details');
      genreDetail.textContent = 'Genre:  ';
      filmDetails.appendChild(genreDetail);

      // Create <span> element, append to <p> element, output name of movie comment
      let genreText = document.createElement('span');
      genreText.setAttribute('id', 'genre-text');
      genreDetail.appendChild(genreText);
      genreText.textContent = movieGenre;
      genreText.style.fontWeight = 'normal';

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


// Displays message to user when no movies present.
function displayNoRecommendationsMessage(message) {
  movieContainer.innerHTML = ''; // Clear any existing content
  let noRecommendationsMessage = document.createElement('p');
  noRecommendationsMessage.setAttribute('id', 'no-recommendation-message');
  movieContainer.appendChild(noRecommendationsMessage);
  noRecommendationsMessage.textContent = message;
}


// ***** EVENT HANDLER(S) *****

// Sort the movieArray based on the selected option, display message if no movies shared by community
function handleSortButton() {
  let sortOption = sortDropdown.value;

  if (sortOption === 'username') {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
    // LocaleCompare ensures sorting is done correctly for strings in different languages or locales. Instead of just using movieArray.sort()
    // If movie array empty or every movie in array matches existing user name output message, community hasn't shared any movies.
    if ( movieArray.length === 0 || movieArray.every(movie => movie.userName === userNameLocalStorage) ) {
      let message = `${userNameLocalStorage}, no movies have been shared by the community yet!`;
      displayNoRecommendationsMessage(message);
    } else {
      movieArray.sort((a, b) => a.userName.localeCompare(b.userName));
      renderMovies();
    }

  } else if (sortOption === 'movietitle') {
    if ( movieArray.length === 0 || movieArray.every(movie => movie.userName === userNameLocalStorage) ) {
      let message = `${userNameLocalStorage}, no movies have been shared by the community yet!`;
      displayNoRecommendationsMessage(message);
    } else {
      movieArray.sort((a, b) => a.movieName.localeCompare(b.movieName));
      renderMovies();
    }

  } else if (sortOption === 'self-submitted') {
    if ( movieArray.some(movie => movie.userName === userNameLocalStorage) ) {
      movieArray.sort((a, b) => a.userName.localeCompare(b.userName));
      renderMoviesOfSelf();
    } else {
      // Output a <p> element indicating user hasn't shared any movie recommendations yet
      movieContainer.innerHTML = ''; // Clear any existing content
      let noRecommendationsMessage = document.createElement('p');
      noRecommendationsMessage.setAttribute('id', 'no-recommendation-message');
      movieContainer.appendChild(noRecommendationsMessage);
      noRecommendationsMessage.textContent = `${userNameLocalStorage}, unlock the movie-sharing experience by sharing your first recommendation! Click the 'Share a Movie' button to begin the journey!`;
    }

  } else if (sortOption === 'genre') {
    if ( movieArray.length === 0 || movieArray.every(movie => movie.userName === userNameLocalStorage) ) {
      let message = `${userNameLocalStorage}, no movies have been shared by the community yet!`;
      displayNoRecommendationsMessage(message);
    } else {
      movieArray.sort((a, b) => a.genre.localeCompare(b.genre));
      renderMovies();
    }
  }

}

function handleWatchedCheckboxChange(event) {
  let checkboxId = event.target.id; // Retrieve ID data from checkbox

  // Obtain unique ID from checkboxId
  // Split checkbox ID 'watched-checkbox-${i}' into array of substrings separated by '-' and obtain third string array which contains unique ID.
  // Once unique ID obtained, convert ID from string to integer with parseInt().
  let index = parseInt(checkboxId.split('-')[2]); // Get the index from the checkbox ID
  let movie = movieArray[index]; // Retrieve selected movie from movieArray for comparison


  // Retrieve watched movie data from local storage (if any)
  let watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
  watchedMovieArray = watchedMovies;

  // Check if the movie from movieArray is already in watchedMovie Array
  let existingIndex = watchedMovieArray.findIndex(item => item.movieId === movie.id);

  if (event.target.checked) {
    // If checkbox checked, add movie to watchedMovieArray if not present already
    if (existingIndex === -1) {
      let watchedMovieObject = new WatchedMovieData(movie.id, true);
      watchedMovieArray.push(watchedMovieObject); //push movie object
      console.log(watchedMovieArray);
    } else {
      
    }
  }

}

// ***** EXECUTABLE CODE *****

loadUserData();

loadMovieArray();

renderGreeting();

renderMovies();

sortButton.addEventListener('click', handleSortButton);
