function initStorage() {
    if (!localStorage.getItem('quizUsers')) {
      localStorage.setItem('quizUsers', JSON.stringify([
        { 
          email: "admin@quiz.com", 
          password: "admin123", 
          role: "admin",
          scores: {}
        }
      ]));
    }
  }