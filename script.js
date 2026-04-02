const buttons = document.querySelectorAll(".season");
const progressBar = document.getElementById("progress");
const progressText = document.getElementById("progress-text");

// carregar estado salvo
const saved = JSON.parse(localStorage.getItem("progress")) || [];

// aplicar estado salvo
buttons.forEach((btn, index) => {
  if (saved[index]) {
    btn.classList.add("active");
  }

  btn.addEventListener("click", () => {
    btn.classList.toggle("active");
    saveProgress();
    updateProgress();
  });
});

// salvar progresso
function saveProgress() {
  const state = [];

  buttons.forEach(btn => {
    state.push(btn.classList.contains("active"));
  });

  localStorage.setItem("progress", JSON.stringify(state));
}

// atualizar barra
function updateProgress() {
  const total = buttons.length;
  const active = document.querySelectorAll(".season.active").length;

  const percent = Math.round((active / total) * 100);

  progressBar.style.width = percent + "%";
  progressText.innerText = percent + "% concluído";
}

// iniciar
updateProgress();
