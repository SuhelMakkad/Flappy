const enterNameModal = document.getElementById("enter-name-modal");
const leaderboardModal = document.getElementById("leaderboard-modal");

const nameInput = document.getElementById("name");
const submitBtn = document.getElementById("submit");
const cancelBtn = document.getElementById("cancel");
const backBtn = document.getElementById("back");
const showLeaderboardBtn = document.getElementById("show-leaderboard");

submitBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  const name = nameInput.value;
  if (!name) return;

  sendScore({ name, score });
});

cancelBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  enterNameModal.style.display = "none";
  gmaeOverModal.style.display = "block";
});

showLeaderboardBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  enterNameModal.style.display = "none";
  leaderboardModal.style.display = "block";
  showLeaderboard();
});

backBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  gmaeOverModal.style.display = "block";
  leaderboardModal.style.display = "none";
  showLeaderboard();
});

function showLeaderboard() {
  enterNameModal.style.display = "none";
  leaderboardModal.style.display = "block";
  const baseURL = "https://shoot-ball-329405.du.r.appspot.com";
  fetch(baseURL + "/flappy/getLeaderboard")
    .then((data) => data.json())
    .then((reults) => {
      leaderboard = reults;
      playersList.innerHTML = "";
      leaderboard.forEach((reult, index) => {
        const li = document.createElement("li");
        const span = document.createElement("span");
        li.classList.add("leaderboard-players");

        const text = `${index + 1}. ${reult.name} - ${reult.score}`;
        span.innerText = text;
        li.appendChild(span);
        playersList.appendChild(li);
      });
    });
}

function sendScore(data) {
  if (!data.name && !data.score) return;
  const baseURL = "https://shoot-ball-329405.du.r.appspot.com";
  fetch(baseURL + "/flappy/setScore", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(showLeaderboard);
}
