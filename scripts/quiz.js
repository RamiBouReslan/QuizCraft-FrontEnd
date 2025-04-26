
const elements = {
    quizTitle: document.getElementById("quizTitle"),
    quizForm: document.getElementById("quizForm"),
    submitButton: document.getElementById("submitButton"),
    homeButton: document.getElementById("homeButton"),
    logoutButton: document.getElementById("logoutButton"),
    scoreFooter: document.getElementById("scoreFooter")
  };
  
  const quizzes = JSON.parse(localStorage.getItem("quizzes"));
  let currentQuiz;
  
  function initializeQuiz() {
    const quizTitle = elements.quizTitle.textContent;
  
    currentQuiz = quizzes.find(quiz => quiz.title === quizTitle);
  
    if (!currentQuiz) {
      window.location.href = "../index.html"; 
      return;
    }
  
    const questionsHTML = currentQuiz.questions.map((question, index) => {
      return `
        <section class="flex column question">
          <h3>${question.question}</h3>
          <div class="flex column">
            ${question.options.map(option => `
              <label class="optionLabel">
                <input type="radio" name="question_${index}" class="optionInput" />${option}
              </label>
            `).join('')}
          </div>
        </section>
      `;
    }).join('');
    
    elements.quizForm.innerHTML = questionsHTML; 
  }
  
  function handleQuizSubmission() {
    let score = 0;
  
    currentQuiz.questions.forEach((question, index) => {
      const selectedOption = document.querySelector(`input[name="question_${index}"]:checked`);
      
      if (selectedOption && selectedOption.nextElementSibling.textContent.trim() === question.answer) {
        score++;
      }
    });
  
    elements.scoreFooter.innerHTML = `You Scored: ${score} / ${currentQuiz.questions.length}`;
  }
  
  
  function setupEventListeners() {
    elements.submitButton.addEventListener("click", handleQuizSubmission);
    
    elements.homeButton.addEventListener("click", function() {
      window.location.href = "../pages/home.html";  
    });
    
    elements.logoutButton.addEventListener("click", function() {
      sessionStorage.removeItem("currentUser");
      window.location.href = "../index.html";  
    });
  }
  

  document.addEventListener("DOMContentLoaded", function() {
    initializeQuiz();  
    setupEventListeners();  
  });
  