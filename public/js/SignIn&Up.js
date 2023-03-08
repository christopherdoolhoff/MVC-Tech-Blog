let signupLink = document.getElementById("signup-link"); //get sign-up link
let signupContainer = document.getElementById("signup-container");
let signinLink = document.getElementById("signin-link");
let signinContainer = document.getElementById("signin-container");

//listen for a click event on signuplink

signupLink.addEventListener("click", function(e) {
  e.preventDefault();   //prevent default action of the link
  signupContainer.style.display = "block";
  signinContainer.style.display = "none";
});

signinLink.addEventListener("click", function(e) {
  e.preventDefault();
  signinContainer.style.display = "block";  //show the sign in container
  signupContainer.style.display = "none";   //hide the signup container
});

// Add event listener to detect screen size changes
window.addEventListener("resize", function() {
  if (window.innerWidth < 600) {
    signinContainer.style.display = "block";
    signupContainer.style.display = "block";
  } else {
    signinContainer.style.display = "block";
    signupContainer.style.display = "none";
  }
});


const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const username_email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username_email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username_email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.cookie=username_email
      console.log(document.cookie)
      document.location.replace(`/profile/`);
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username_email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username_email && password) {
    const response = await fetch('/api/users/', {
      method: 'POST',
      body: JSON.stringify({ username_email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace(`/profile/`);
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('#login-container')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('#signup-container')
  .addEventListener('submit', signupFormHandler);