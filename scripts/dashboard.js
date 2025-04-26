const logoutButton = document.getElementById("logoutButton");
const dashboardMain = document.getElementById("dashboardMain");
const scoresTitle = document.getElementById("scoresTitle");

function setupLogout() {
    logoutButton.addEventListener("click", logoutUser);
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

function renderScores() {
    const oldArticles = dashboardMain.querySelectorAll("article");
    for (let i = 0; i < oldArticles.length; i++) {
        dashboardMain.removeChild(oldArticles[i]);
    }

    const usersData = localStorage.getItem("quizUsers");

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
        usernameHeading.textContent = user.email;
        usernameSection.appendChild(usernameHeading);

        const scoreList = document.createElement("ul");
        scoreList.classList.add("flex", "column", "scoreList");

        if (user.scores) {
            for (const key in user.scores) {
                if (user.scores.hasOwnProperty(key)) {
                    const listItem = document.createElement("li");
                    listItem.textContent = key + " : " + user.scores[key];
                    scoreList.appendChild(listItem);
                }
            }
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
