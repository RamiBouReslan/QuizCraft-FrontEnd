
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
  
 