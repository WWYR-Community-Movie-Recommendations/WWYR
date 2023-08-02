'use strict';

// ***** GLOBALS *****
let userArray = [];


// ***** DOM WINDOWS *****
let newUserForm = document.getElementById('newUserForm');
let userIDInput = document.getElementById('userID');


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


// Check local storage and load user data and userArray
function loadUserData() {

  // Retrieve existing user data from local storage (if any) and convert into usable JavaScript data, if no data establish empty array
  let existingUsers = JSON.parse(localStorage.getItem('users')) || [];

  // Restore userArray with data from local storage (if any)
  userArray = existingUsers;

}


// Check if user name taken regardless of casing used
function checkUserNameAvailability(userNameCheck) {

  // Lowercase userNameCheck
  userNameCheck = userNameCheck.toLowerCase();

  // Check if userName matches any userName in userArray
  return userArray.some(function(user) {
    // Lowercase user names from userArray
    let lowercaseUserName = user.userName.toLowerCase();
    // Check if userName equals userNameCheck
    return lowercaseUserName === userNameCheck;
  });

}


// Check if user ID taken
function checkUserIDAvailability(userIDCheck) {

  // Check is userID matches any userID in userArray
  return userArray.some(function(user) {
    return user.userID === userIDCheck;
  });

}


// ***** EVENT HANDLERS *****

// Events when new user presses 'Create User' button
function handleCreateUser (event) {

  event.preventDefault();

  // Retrieve values from user form (html)
  let userNameNew = event.target.userName.value;
  let userIDNew = event.target.userID.value;

  // Check if the username already exists in the userArray
  let usernameExists = checkUserNameAvailability(userNameNew);

  // Check if userID already exists in userArray
  let userIDExists = checkUserIDAvailability(userIDNew);

  // If username already exists pop up alert, reset form
  if (usernameExists || userIDExists) {
    // Username is already taken, display an alert
    alert('Username or UserID already taken. Please choose a different username or ID.');
    // Reset the form
    event.target.reset();
    return; // Stop execution, do not create a new user
  }

  // Create a new User object
  createUser(userNameNew, userIDNew);

  // Store new user to local storage
  storeUsersToLocalStorage(userArray);

  // Redirect to index.html to sign in as existing user
  window.location.href = 'index.html';

}


// Limit user ID to four digits only and ensure numeric value only
function handleIDInput() {

  // Get current value of the ID input
  let inputValue = userIDInput.value;

  // Check if the value is numeric
  if (isNaN(inputValue)) {
    // If not numeric don't allow typing
    userIDInput.value = '';
  }

}


// ***** EXECUTABLE CODE *****

loadUserData();

userIDInput.addEventListener('input', handleIDInput);

// Add event listener to form 'userForm' where new user enters info
newUserForm.addEventListener('submit', handleCreateUser);
