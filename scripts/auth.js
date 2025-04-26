const elements = {
  loginTabBtn: document.getElementById("loginTabBtn"),
  signupTabBtn: document.getElementById("signupTabBtn"),
  loginSection: document.getElementById("loginSection"),
  resetPassSection: document.getElementById("resetPassSection"),
  signupSection: document.getElementById("signupSection"),
  loginForm: document.getElementById("loginForm"),
  resetPasswordForm: document.getElementById("resetPasswordForm"),
  signupForm: document.getElementById("signupForm"),
  forgotPasswordLink: document.getElementById("forgotPasswordLink"),
  loginEmail: document.getElementById("loginEmail"),
  loginPassword: document.getElementById("loginPassword"),
  signupEmail: document.getElementById("signupEmail"),
  signupPassword: document.getElementById("signupPassword"),
  signupConfirmPassword: document.getElementById("signupConfirmPassword"),
  resetEmail: document.getElementById("resetEmail"),
  resetNewPassword: document.getElementById("resetNewPassword"),
  resetConfirmPassword: document.getElementById("resetConfirmPassword"),
  resetHiddenDiv: document.getElementById("resetHiddenDiv"),
  resetSubmitBtn: document.getElementById("resetSubmitBtn"),
  resetConfirmBtn: document.getElementById("resetConfirmBtn"),
};

function showSection(section) {
  elements.loginSection.classList.add("hidden");
  elements.signupSection.classList.add("hidden");
  elements.resetPassSection.classList.add("hidden");

  if (section === "login") {
    elements.loginSection.classList.remove("hidden");
  } else if (section === "signup") {
    elements.signupSection.classList.remove("hidden");
  } else if (section === "reset") {
    elements.resetPassSection.classList.remove("hidden");
  }
}

function handleLogin(e) {
  e.preventDefault();
  const email = elements.loginEmail.value;
  const password = elements.loginPassword.value;
  const users = JSON.parse(localStorage.getItem("quizUsers")) || [];

  if (email === "admin@quiz.com" && password === "admin123") {
    sessionStorage.setItem(
      "currentUser",
      JSON.stringify({ email: email, role: "admin" })
    );
    window.location.href = "./pages/dashboard.html";
    return;
  }

  let user = null;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email && users[i].password === password) {
      user = users[i];
      break;
    }
  }

  if (user) {
    sessionStorage.setItem(
      "currentUser",
      JSON.stringify({
        email: email,
        role: "user",
        username: user.username,
        scores: user.scores,
      })
    );
    window.location.href = "./pages/home.html";
  } else {
    alert("Invalid email or password");
  }
}

function handleSignup(e) {
  e.preventDefault();

  const email = elements.signupEmail.value;
  const password = elements.signupPassword.value;
  const confirmPassword = elements.signupConfirmPassword.value;

  if (password !== confirmPassword) {
    alert("Passwords don't match!");
    return;
  }

  const users = JSON.parse(localStorage.getItem("quizUsers")) || [];

  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      alert("Email already registered!");
      return;
    }
  }

  const newUser = {
    email: email,
    password: password,
    role: "user",
    username: email.split('@')[0],
    scores: []
  };

  users.push(newUser);
  localStorage.setItem("quizUsers", JSON.stringify(users));


  alert("Registration successful! Redirecting...");
  window.location.href = "./pages/home.html";
  elements.signupForm.reset();
}

function handlePasswordReset(e) {
  e.preventDefault();

  const email = elements.resetEmail.value;

  if (elements.resetHiddenDiv.classList.contains("hidden")) {
    const users = JSON.parse(localStorage.getItem("quizUsers")) || [];

    let userExists = false;
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        userExists = true;
        break;
      }
    }

    if (!userExists) {
      alert("Email not found in our system!");
      return;
    }

    elements.resetHiddenDiv.classList.remove("hidden");
    elements.resetSubmitBtn.classList.add("hidden");
  } else {
    const newPassword = elements.resetNewPassword.value;
    const confirmPassword = elements.resetConfirmPassword.value;

    if (newPassword !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("quizUsers")) || [];
    let userIndex = -1;
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        userIndex = i;
        break;
      }
    }

    if (userIndex !== -1) {
      users[userIndex].password = newPassword;
      localStorage.setItem("quizUsers", JSON.stringify(users));
      sessionStorage.setItem(
        "currentUser",
        JSON.stringify({ email: email, role: "user" })
      );

      alert("Password updated successfully! Redirecting...");

      window.location.href = "./pages/home.html";
    }
  }
}

function setupEventListeners() {
  elements.loginTabBtn.addEventListener("click", function () {
    showSection("login");
  });

  elements.signupTabBtn.addEventListener("click", function () {
    showSection("signup");
  });

  elements.forgotPasswordLink.addEventListener("click", function (e) {
    e.preventDefault();
    showSection("reset");
  });

  elements.loginForm.addEventListener("submit", handleLogin);
  elements.signupForm.addEventListener("submit", handleSignup);
  elements.resetPasswordForm.addEventListener("submit", handlePasswordReset);
}

document.addEventListener("DOMContentLoaded", function () {
  initStorage();
  setupEventListeners();
  showSection("login");
});
