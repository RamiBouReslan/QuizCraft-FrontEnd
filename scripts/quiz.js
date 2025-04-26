const quizTitle = document.getElementById("quizTitle");
const quizForm = document.getElementById("quizForm");
const submitButton = document.getElementById("submitButton");
const scoreFooter = document.getElementById("scoreFooter");
const homeButton = document.getElementById("homeButton");
const logoutButton = document.getElementById("logoutButton");

const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];

function initializeQuiz() {
  const selectedQuizTitle = localStorage.getItem("selectedQuizTitle");

  if (!selectedQuizTitle) {
    alert("No quiz selected!");
    window.location.href = "../pages/home.html";
    return;
  }

  quizTitle.textContent = selectedQuizTitle;

  const currentQuiz = quizzes.find((q) => q.title === selectedQuizTitle);

  if (!currentQuiz) {
    alert("Quiz not found!");
    window.location.href = "../pages/home.html";
    return;
  }

  quizForm.innerHTML = ""; 

  for (let i = 0; i < currentQuiz.questions.length; i++) {
    const questionSection = document.createElement("section");
    questionSection.className = "flex column question";

    const questionTitle = document.createElement("h3");
    questionTitle.textContent = currentQuiz.questions[i].question;
    questionSection.appendChild(questionTitle);

    const optionsContainer = document.createElement("div");
    optionsContainer.className = "flex column";

    for (let j = 0; j < currentQuiz.questions[i].options.length; j++) {
      const label = document.createElement("label");
      label.className = "optionLabel";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question_${i}`;
      input.className = "optionInput";
      input.value = currentQuiz.questions[i].options[j];

      label.appendChild(input);
      label.append(currentQuiz.questions[i].options[j]);
      optionsContainer.appendChild(label);
    }

    questionSection.appendChild(optionsContainer);
    quizForm.appendChild(questionSection);
  }
}

function handleQuizSubmission() {
  let score = 0;
  const selectedQuizTitle = localStorage.getItem("selectedQuizTitle");
  const currentQuiz = quizzes.find((q) => q.title === selectedQuizTitle);

  if (!currentQuiz) {
    alert("Quiz not found!");
    return;
  }

  currentQuiz.questions.forEach((question, i) => {
    const selectedOption = document.querySelector(
      `input[name="question_${i}"]:checked`
    );
    if (selectedOption && selectedOption.value.trim() === question.answer) {
      score++;
    }
  });

  scoreFooter.innerHTML = `You Scored: ${score} / ${currentQuiz.questions.length}`;
}

function setupEventListeners() {
  submitButton.addEventListener("click", handleQuizSubmission);
  homeButton.addEventListener("click", goToHomePage);
  logoutButton.addEventListener("click", logoutUser);
}

function goToHomePage() {
  window.location.href = "../pages/home.html";
}

function logoutUser() {
  sessionStorage.removeItem("currentUser");
  window.location.href = "../index.html";
}

function init() {
  initializeQuiz();
  setupEventListeners();
}

document.addEventListener("DOMContentLoaded", init);
