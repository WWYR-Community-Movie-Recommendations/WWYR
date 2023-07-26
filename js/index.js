'use strict';

// ***** GLOBALS *****
let userArray = [];

// ***** DOM WINDOWS *****
// Get user name and user ID from the input fields
let existingUserForm = document.getElementById('existingUserForm');
let userIDInput = document.getElementById('userID');

// ***** HELPER FUNCTIONS / UTILITIES *****

// Update userArray and store to local storage
function persistUserName(existingUserName) {
  // ****** Store to Local Storage ******
  // Store userName to local storage, not need to stringify as already type 'string'
  localStorage.setItem('userName', existingUserName);

}

// Check if user name and ID exist in userArray
function checkUserExists(userNameCheck, userIDCheck) {
  // Return boolean value (true or false) if matches any userName and ID in userArray
  return userArray.some(function (user) {
    return user.userName === userNameCheck && user.userID === userIDCheck;
  });
}

// ***** EVENT HANDLERS *****
function handleSubmit (event) {
  event.preventDefault();

  // Retrieve values from user form (html)
  let userNameCheck = event.target.userName.value;
  let userIDCheck = event.target.userID.value;

  // Check if the user exists in userArray
  let userExists = checkUserExists(userNameCheck, userIDCheck);

  // Check if userName and UserID match existing data storage, if match, re-direct to home.html and create current user variable to store in local storage
  if (userExists) {
    // Store existing user name to local storage
    persistUserName(userNameCheck);

    // Redirect to index.html
    window.location.href = 'home.html';

  } else {
    alert('Username and/or UserID do not match. Please check your input.');
    // Reset the form
    event.target.reset();
  }
}

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

// ***** Check Local Storage and Load into userArray If Any *****
// Retrieve existing user data from local storage (if any) and convert into usable JavaScript data, if no data establish empty array
let existingUsers = JSON.parse(localStorage.getItem('users')) || [];

// Restore userArray with data from local storage (if any)
userArray = existingUsers;

// ***** User Enters Existing User Info, Check Made if userName and userID Exist, If Exist Direct to Home Page (home.html) *****

// Add listener to limit user ID to four digits only and ensure numeric value only
userIDInput.addEventListener('input', handleIDInput);

// Add event listener to form 'userForm' where user enters info
existingUserForm.addEventListener('submit', handleSubmit);
