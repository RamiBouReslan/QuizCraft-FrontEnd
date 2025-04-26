const logoutButton = document.getElementById("logoutButton");
const scoreListContainer = document.getElementById("scoreListContainer");

// Sample structure for users and their scores
const users = [
  {
    username: "UserOne",
    scores: [
      { title: "HTML Basics", score: "3/5" },
      { title: "CSS Basics", score: "4/5" },
    ]
  },
  {
    username: "UserTwo",
    scores: [
      { title: "HTML Basics", score: "2/5" },
      { title: "CSS Basics", score: "5/5" },
    ]
  }
];

function renderScores() {
  
  scoreListContainer.innerHTML = '';

  users.forEach(user => {
    const scoreTable = document.createElement("article");
    scoreTable.classList.add("flex", "scoreTable", "font");

    const usernameSection = document.createElement("section");
    usernameSection.classList.add("flex", "column", "username");

    const usernameHeading = document.createElement("h3");
    usernameHeading.textContent = user.username;
    usernameSection.appendChild(usernameHeading);

    const scoreList = document.createElement("ul");
    scoreList.classList.add("flex", "column", "scoreList");

    user.scores.forEach(score => {
      const scoreItem = document.createElement("li");
      scoreItem.textContent = `${score.title} : ${score.score}`;
      scoreList.appendChild(scoreItem);
    });

    scoreTable.appendChild(usernameSection);
    scoreTable.appendChild(scoreList);

    
    scoreListContainer.appendChild(scoreTable);
  });
}

logoutButton.addEventListener("click", function() {
  sessionStorage.removeItem("currentUser");
  window.location.href = "../index.html";
});

document.addEventListener("DOMContentLoaded", renderScores);
