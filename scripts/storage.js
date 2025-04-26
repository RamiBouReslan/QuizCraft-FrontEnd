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


  const quizzes = [
    {
      title: "HTML Basics",
      questions: [
        {
          question: "What does HTML stand for?",
          options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
          answer: "Hyper Text Markup Language"
        },
        {
          question: "Which HTML tag is used to define an internal style sheet?",
          options: ["<style>", "<script>", "<css>"],
          answer: "<style>"
        },
        {
          question: "What is the correct HTML element for inserting a line break?",
          options: ["<br>", "<break>", "<lb>"],
          answer: "<br>"
        },
        {
          question: "Which HTML tag is used to display a picture on a webpage?",
          options: ["<image>", "<img>", "<pic>"],
          answer: "<img>"
        },
        {
          question: "What is the correct HTML element for the largest heading?",
          options: ["<heading>", "<h6>", "<h1>"],
          answer: "<h1>"
        }
      ]
    },
    {
      title: "CSS Basics",
      questions: [
        {
          question: "What does CSS stand for?",
          options: ["Colorful Style Sheets", "Creative Style Sheets", "Cascading Style Sheets"],
          answer: "Cascading Style Sheets"
        },
        {
          question: "Which property is used to change the background color?",
          options: ["color", "background-color", "bg-color"],
          answer: "background-color"
        },
        {
          question: "How do you select an element with id 'main'?",
          options: [".main", "#main", "main"],
          answer: "#main"
        },
        {
          question: "Which CSS property controls the text size?",
          options: ["font-style", "text-size", "font-size"],
          answer: "font-size"
        },
        {
          question: "How do you make text bold in CSS?",
          options: ["font-weight: bold;", "text-style: bold;", "font: bold;"],
          answer: "font-weight: bold;"
        }
      ]
    },
    {
      title: "JavaScript Basics",
      questions: [
        {
          question: "Inside which HTML element do we put the JavaScript?",
          options: ["<js>", "<script>", "<javascript>"],
          answer: "<script>"
        },
        {
          question: "How do you write 'Hello World' in an alert box?",
          options: ["msg('Hello World')", "alertBox('Hello World')", "alert('Hello World')"],
          answer: "alert('Hello World')"
        },
        {
          question: "Which symbol is used for comments in JavaScript?",
          options: ["<!-- -->", "//", "**"],
          answer: "//"
        },
        {
          question: "What is the correct way to write a comment in JavaScript?",
          options: ["// This is a comment", "' This is a comment", "# This is a comment"],
          answer: "// This is a comment"
        },
        {
          question: "Which built-in method is used to round a number to the nearest integer?",
          options: ["Math.ceil()", "Math.round()", "Math.floor()"],
          answer: "Math.round()"
        }
      ]
    }
  ];
  
  localStorage.setItem("quizzes", JSON.stringify(quizzes));
  