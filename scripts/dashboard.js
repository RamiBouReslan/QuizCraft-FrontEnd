const logoutButton = document.getElementById("logoutButton");
const dashboardMain = document.getElementById("dashboardMain");
const scoresTitle = document.getElementById("scoresTitle");

function setupLogout() {
  document.getElementById("logoutButton").addEventListener("click", logoutUser);
}

function logoutUser() {
  sessionStorage.removeItem("currentUser");
  window.location.href = "../index.html";
}

function checkAdminAccess() {
  const userData = localStorage.getItem("currentUser");

  if (!userData) {
    return;
  }

  const user = JSON.parse(userData);

  if (!user.role || user.role !== "admin") {
    alert("Access denied. Admins only.");
    window.location.href = "../index.html";
  }
}

function capitalizeUsername(username) {
  let capitalizedUsername = "";
  const words = username.split(" ");
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    capitalizedUsername +=
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

    if (i < words.length - 1) {
      capitalizedUsername += " ";
    }
  }
  return capitalizedUsername;
}

function renderScores() {
    const dashboardMain = document.getElementById("dashboardMain");
    const scoresTitle = document.getElementById("scoresTitle");

    const oldArticles = dashboardMain.querySelectorAll("article");
    for (let i = 0; i < oldArticles.length; i++) {
        dashboardMain.removeChild(oldArticles[i]);
    }

    const usersData = localStorage.getItem("quizUsers");
console.log(usersData)
    if (!usersData) {
        scoresTitle.style.display = "none";
        return;
    }

    const users = JSON.parse(usersData);
    let normalUserFound = false;

    for (let i = 0; i < users.length; i++) {
        const user = users[i];

        if (user.role === "admin") {
            continue;
        }

        normalUserFound = true;

        const scoreTable = document.createElement("article");
        scoreTable.classList.add("flex", "scoreTable", "font");

        const usernameSection = document.createElement("section");
        usernameSection.classList.add("flex", "column", "username");

        const usernameHeading = document.createElement("h3");
        usernameHeading.textContent = capitalizeUsername(user.username || user.email); 
        usernameSection.appendChild(usernameHeading);

        const emailParagraph = document.createElement("h3");
        emailParagraph.textContent = `${user.email}`;
        usernameSection.appendChild(emailParagraph);

        const scoreList = document.createElement("ul");
        scoreList.classList.add("flex", "column", "scoreList");

        if (user.scores && user.scores.length > 0) {
            user.scores.forEach(score => {
                const listItem = document.createElement("li");
                listItem.textContent = `${score.title}: ${score.score}`;
                scoreList.appendChild(listItem);
            });
        } else {
            const noScoresMessage = document.createElement("li");
            noScoresMessage.textContent = "No scores available yet.";
            scoreList.appendChild(noScoresMessage);
        }

        scoreTable.appendChild(usernameSection);
        scoreTable.appendChild(scoreList);

        dashboardMain.appendChild(scoreTable);
    }

    if (!normalUserFound) {
        scoresTitle.style.display = "none";
    } else {
        scoresTitle.style.display = "block";
    }
}


function init() {
  checkAdminAccess();
  renderScores();
  setupLogout();
}

document.addEventListener("DOMContentLoaded", init);
