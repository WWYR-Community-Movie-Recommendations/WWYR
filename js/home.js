'use strict';

// ***** GLOBALS *****
// let userArray = [];
let user ='';





// ***** DOM WINDOWS *****
// Get h2 element (user greeting) by id
let userGreeting = document.getElementById('user-greeting');





// ***** HELPER FUNCTIONS / UTILITIES *****
function renderGreeting() {

  // Update the content of the h2 element with the greeting message
  userGreeting.textContent = `Welcome ${user}! Here is your recommended movie!`;
}




// ***** EXECUTABLE CODE *****
// Retrieve current user name from local storage
user = localStorage.getItem('userName');
// Render greeting to current user
renderGreeting();

// ***** Check Local Storage and Load into userArray If Any *****
// Retrieve existing user data from local storage (if any) and convert into usable JavaScript data, if no data establish empty array


// Restore userArray with data from local storage (if any)




