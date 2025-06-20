const elements = {
  userWelcome: document.getElementById("userWelcome"),
  quizSelect: document.getElementById("quizSelect"),
  logoutButton: document.getElementById("logoutButton"),
};

function initializeHomePage() {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  if (!currentUser) {
    window.location.href = "../index.html";
    return;
  }

  const username = currentUser.email.split("@")[0];
  const capitalizedUsername =
    username.charAt(0).toUpperCase() + username.slice(1);

  elements.userWelcome.textContent = "Welcome " + capitalizedUsername;

  const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];

  while (elements.quizSelect.getElementsByTagName("button").length > 0) {
    elements.quizSelect.removeChild(
      elements.quizSelect.getElementsByTagName("button")[0]
    );
  }

  for (let i = 0; i < quizzes.length; i++) {
    const quizButton = document.createElement("button");
    quizButton.textContent = quizzes[i].title;
    quizButton.className = "bottunHeader font";
    quizButton.id = `quizButton_${i}`;
    quizButton.addEventListener("click", function () {
        startQuiz(quizzes[i].title); 
      });
  
    elements.quizSelect.appendChild(quizButton);
  }
}

function startQuiz(quizTitle) {
    localStorage.setItem('selectedQuizTitle', quizTitle);
    window.location.href = "../pages/quiz.html";
  }
  

function logout() {
  sessionStorage.removeItem("currentUser");
  window.location.href = "../index.html";
}

document.addEventListener("DOMContentLoaded", initializeHomePage);
elements.logoutButton.addEventListener("click", logout);
