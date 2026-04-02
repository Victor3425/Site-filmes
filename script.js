const buttons = document.querySelectorAll(".season");
const progressBar = document.getElementById("progress");
const progressText = document.getElementById("progress-text");

// carregar estado salvo
const saved = JSON.parse(localStorage.getItem("progress")) || [];

// evitar múltiplos cliques rápidos (mobile fix)
let isClicking = false;

// aplicar estado salvo
buttons.forEach((btn, index) => {
  if (saved[index]) {
    btn.classList.add("active");
  }

  btn.addEventListener("click", (e) => {
    e.preventDefault();

    // 🔥 trava clique duplicado
    if (isClicking) return;
    isClicking = true;

    btn.classList.toggle("active");

    updateCardState(btn);
    saveProgress();
    updateProgress();

    // libera depois de 150ms
    setTimeout(() => {
      isClicking = false;
    }, 150);
  });
});

// controla estado do card corretamente
function updateCardState(btn) {
  const card = btn.closest(".card");
  const activeButtons = card.querySelectorAll(".season.active");

  if (activeButtons.length > 0) {
    card.classList.add("active");
  } else {
    card.classList.remove("active");
  }
}

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

// aplicar estado inicial correto
buttons.forEach(btn => updateCardState(btn));

// iniciar
updateProgress();
