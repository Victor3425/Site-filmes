const buttons = document.querySelectorAll(".season");
const progressBar = document.getElementById("progress");
const progressText = document.getElementById("progress-text");

const saved = JSON.parse(localStorage.getItem("progress")) || [];

buttons.forEach((btn, index) => {

  if (saved[index]) {
    btn.classList.add("active");
  }

  btn.addEventListener("click", () => {

    btn.classList.toggle("active");

    const card = btn.closest(".card");

    // 🔥 CORREÇÃO FINAL: verifica TODOS os botões do card
    const anyActive = card.querySelectorAll(".season.active").length > 0;

    if (anyActive) {
      card.classList.add("active");
    } else {
      card.classList.remove("active");
    }

    saveProgress();
    updateProgress();
  });

});

function saveProgress() {
  const state = [];
  buttons.forEach(btn => {
    state.push(btn.classList.contains("active"));
  });
  localStorage.setItem("progress", JSON.stringify(state));
}

function updateProgress() {
  const total = buttons.length;
  const active = document.querySelectorAll(".season.active").length;

  const percent = Math.round((active / total) * 100);

  progressBar.style.width = percent + "%";
  progressText.innerText = percent + "% concluído";
}

// inicialização correta
buttons.forEach(btn => {
  const card = btn.closest(".card");
  const anyActive = card.querySelectorAll(".season.active").length > 0;

  if (anyActive) {
    card.classList.add("active");
  }
});

updateProgress();
