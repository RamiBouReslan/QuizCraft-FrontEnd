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