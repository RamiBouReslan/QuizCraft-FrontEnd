const elements = {
   
    loginTabBtn: document.getElementById('loginTabBtn'),
    signupTabBtn: document.getElementById('signupTabBtn'),
      
    loginSection: document.getElementById('loginSection'),
    resetPassSection: document.getElementById('resetPassSection'),
    signupSection: document.getElementById('signupSection'),
   
    loginForm: document.getElementById('loginForm'),
    resetPasswordForm: document.getElementById('resetPasswordForm'),
    signupForm: document.getElementById('signupForm'),
   
    forgotPasswordLink: document.getElementById('forgotPasswordLink')
  };

  function showSection(section) {
    
    elements.loginSection.classList.add('hidden');
    elements.signupSection.classList.add('hidden');
    elements.resetPassSection.classList.add('hidden');
    elements.loginTabBtn.classList.remove('active-tab');
    elements.signupTabBtn.classList.remove('active-tab');
    
    switch(section) {
      case 'login':
        elements.loginSection.classList.remove('hidden');
        elements.loginTabBtn.classList.add('active-tab');
        break;
      case 'signup':
        elements.signupSection.classList.remove('hidden');
        elements.signupTabBtn.classList.add('active-tab');
        break;
      case 'reset':
        elements.resetPassSection.classList.remove('hidden');
        break;
    }  
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const users = JSON.parse(localStorage.getItem('quizUsers'));
  

    if (email === "admin@quiz.com" && password === "admin123") {
      sessionStorage.setItem('currentUser', JSON.stringify({ email, role: "admin" }));
      window.location.href = "dashboard.html";
      return;
    }
  
   
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      sessionStorage.setItem('currentUser', JSON.stringify({ email, role: "user" }));
      window.location.href = "home.html";
    } else {
      alert("Invalid email or password");
    }
  }

  function handleSignup(e) {
    e.preventDefault();
    const email = document.querySelector('#signupSection input[type="email"]').value;
    const password = document.querySelector('#signupSection input[type="password"]:first-of-type').value;
    const confirmPassword = document.querySelector('#signupSection input[type="password"]:last-of-type').value;
  
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
  
    const users = JSON.parse(localStorage.getItem('quizUsers'));
    if (users.some(u => u.email === email)) {
      alert("Email already registered!");
      return;
    }
  
    users.push({ email, password, role: "user", scores: {} });
    localStorage.setItem('quizUsers', JSON.stringify(users));
    alert("Registration successful! Please login.");
    showSection('login');
    elements.signupForm.reset();
  }
  
  function handlePasswordReset(e) {
    e.preventDefault();
    const email = document.querySelector('#resetPassSection input[type="email"]').value;
    const newPassword = document.querySelector('#resetPassSection input[type="password"]:first-of-type').value;
    const confirmPassword = document.querySelector('#resetPassSection input[type="password"]:last-of-type').value;
  
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
  
    const users = JSON.parse(localStorage.getItem('quizUsers'));
    const userIndex = users.findIndex(u => u.email === email);
  
    if (userIndex === -1) {
      alert("Email not found!");
      return;
    }
  
    users[userIndex].password = newPassword;
    localStorage.setItem('quizUsers', JSON.stringify(users));
    alert("Password updated successfully!");
    showSection('login');
    elements.resetPasswordForm.reset();
  }