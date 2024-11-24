const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// username regex only contains letters, min length 3
const usernameRegex = /^[A-Za-z]{3,}$/;

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
function validateEmail(email) {
  return emailRegex.test(email);
}

// Password validation (must be 8+ characters, contain at least one number, one uppercase letter)
function validatePassword(password) {
  return passwordRegex.test(password);
}

// Username validation (only letters, min length 3)
function validateUsername(username) {
  return usernameRegex.test(username);
}


function loginUser(email, password) {
  const errors = [];

  if (!validateEmail(email)) errors.push("Invalid email format");
  if (!validatePassword(password))
    errors.push("Invalid password");

  return (errors.length > 0) ? errors : "Login Successful";

}


function signUpUser(email, password, username) {
  const errors = [];

  if (!validateEmail(email)) errors.push("Invalid email format");
  if (!validateUsername(username))
    errors.push(
      "Username must be at least 3 characters and contain only letters"
    );
  if (!validatePassword(password))
    errors.push("Password does not meet criteria");

  return (errors.length > 0) ? errors : "Sign-Up Successful";
}

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const resultMessageElement = document.getElementById("result-message");

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const loginResult = loginUser(email, password);
      resultMessageElement.innerHTML = "";
      resultMessageElement.classList.remove("error", "success");

      if (loginResult.includes("Login Successful")) {
        resultMessageElement.textContent = "Login Successful";
        resultMessageElement.classList.add("success");
      } else {
        loginResult.forEach((error) => {
          const errorElement = document.createElement("p");
          errorElement.textContent = error;
          resultMessageElement.appendChild(errorElement);
        });
        resultMessageElement.classList.add("error");
      }
    });
  }

  const signUpForm = document.getElementById("signUpForm");

  if (signUpForm) {
    signUpForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const username = document.getElementById("username").value;

      const signUpResult = signUpUser(email, password, username);
      resultMessageElement.innerHTML = "";
      resultMessageElement.classList.remove("error", "success");

      if (signUpResult.includes("Sign-Up Successful")) {
        resultMessageElement.textContent = "Sign-Up Successful";
        resultMessageElement.classList.add("success");
      } else {
        signUpResult.forEach((error) => {
          const errorElement = document.createElement("p");
          errorElement.textContent = error;
          resultMessageElement.appendChild(errorElement);
        });
        resultMessageElement.classList.add("error");
      }
    });
  }
});
