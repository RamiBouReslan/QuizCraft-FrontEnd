
const quizTitle = document.getElementById("quizTitle");
const quizForm = document.getElementById("quizForm");
const submitButton = document.getElementById("submitButton");
const scoreFooter = document.getElementById("scoreFooter");
const homeButton = document.getElementById("homeButton");
const logoutButton = document.getElementById("logoutButton");


const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];


function initializeQuiz() {
  const selectedQuizTitle = localStorage.getItem('selectedQuizTitle');

  if (!selectedQuizTitle) {
    alert("No quiz selected!");
    window.location.href = "../pages/home.html";
    return;
  }


  quizTitle.textContent = selectedQuizTitle;


  const currentQuiz = quizzes.find(q => q.title === selectedQuizTitle);

  if (!currentQuiz) {
    alert("Quiz not found!");
    window.location.href = "../pages/home.html";
    return;
  }


  quizForm.innerHTML = currentQuiz.questions.map((question, i) => `
    <section class="flex column question">
      <h3>${question.question}</h3>
      <div class="flex column">
        ${question.options.map(option => `
          <label class="optionLabel">
            <input type="radio" name="question_${i}" class="optionInput" value="${option}" />
            ${option}
          </label>
        `).join('')}
      </div>
    </section>
  `).join('');
}


function handleQuizSubmission() {
  let score = 0;
  const selectedQuizTitle = localStorage.getItem('selectedQuizTitle');
  const currentQuiz = quizzes.find(q => q.title === selectedQuizTitle);

  if (!currentQuiz) {
    alert("Quiz not found!");
    return;
  }

 
  currentQuiz.questions.forEach((question, i) => {
    const selectedOption = document.querySelector(`input[name="question_${i}"]:checked`);
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
