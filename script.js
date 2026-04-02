const buttons = document.querySelectorAll(".season");
const progressBar = document.getElementById("progress");
const progressText = document.getElementById("progress-text");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("active");
    updateProgress();
  });
});

function updateProgress() {
  const total = buttons.length;
  const active = document.querySelectorAll(".season.active").length;

  const percent = Math.round((active / total) * 100);

  progressBar.style.width = percent + "%";
  progressText.innerText = percent + "% concluído";

  if (percent === 100) {
    progressText.innerText = "💖 Missão romântica completa!";
  }
}

updateProgress();