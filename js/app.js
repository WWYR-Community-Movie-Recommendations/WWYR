'use strict';

// ***** GLOBALS *****
let userArray = [];

// ***** DOM WINDOWS *****
// Get user name and user ID from the input fields
let userForm = document.getElementById('userForm');

// ***** CONSTRUCTOR FUNCTION *****
function User(userName, userID) {
  this.userName = userName;
  this.userID = userID;
  this.recommendedMovies = []; // array to store recommended movies
}

// ***** HELPER FUNCTIONS / UTILITIES *****

//Create new user objects and push to userArray
function createUser(name, userID) {

  userArray.push(new User(name, userID));

}

// Update userArray and store to local storage
function storeUsersToLocalStorage(userArray) {

  // ****** Store to Local Storage ******
  // Convert data to string/JSON to store in local storage
  let stringifiedUsers = JSON.stringify(userArray);

  // Store stringified data to local storage
  localStorage.setItem('users', stringifiedUsers);

}

// Check if user name taken
function checkUserNameAvailability(userName) {

  // Check if userName matches any userName in userArray
  return userArray.some(function(user) {
    return user.userName === userName;
  });

}

// ***** EVENT HANDLERS *****
function handleCreateUser (event) {
  event.preventDefault();

  // Retrieve values from user form (html)
  let userName = event.target.userName.value;
  let userID = event.target.userID.value;

  // Check if the username already exists in the userArray
  let usernameExists = checkUserNameAvailability(userName);

  // If username already exists pop up alert, reset form
  if (usernameExists) {
    // Username is already taken, display an alert
    alert('Username already taken. Please choose a different username.');
    // Reset the form
    event.target.reset();
    return; // Stop execution, do not create a new user
  }

  // Create a new User object
  createUser(userName, userID);

  // Store new user to local storage
  storeUsersToLocalStorage(userArray);

  // Redirect to index.html to sign in as existing user
  window.location.href = 'index.html';
}

// ***** EXECUTABLE CODE *****

// ***** Check Local Storage and Load into userArray If Any *****
// Retrieve existing user data from local storage (if any) and convert into usable JavaScript data, if no data establish empty array
let existingUsers = JSON.parse(localStorage.getItem('users')) || [];

// Restore userArray with data from local storage (if any)
userArray = existingUsers;

// ***** User Adds Info, Check Made if userName Exists, Once User Created Direct to Existing User Page (index.html) *****
// Add event listener to form 'userForm'
userForm.addEventListener('submit', handleCreateUser);
