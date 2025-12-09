let eventos = [];

// renderiza a agenda
function atualizarAgenda() {
    const agenda = document.getElementById("agenda");
    agenda.innerHTML = "";

    eventos.forEach(ev => {
        agenda.innerHTML += `
    <div class="card">
        <strong>${ev.titulo}</strong><br>
        ${ev.local}<br>
        ${ev.professor}<br>
        ${ev.data} - ${ev.hora}<br><br>

        <button class="btn-delete" onclick="deleteEvent(${ev.id})">Remover</button>
    </div>
`;

    });
}

// abre modal
function openForm() {
    document.getElementById("modal").classList.remove("hidden");
}

// fecha modal
function closeForm() {
    document.getElementById("modal").classList.add("hidden");
}

// adiciona evento
function addEvent(e) {
    e.preventDefault();

    eventos.push({
    id: Date.now(),    // GERADOR DE ID ÚNICO
    titulo: document.getElementById("titulo").value,
    local: document.getElementById("local").value,
    professor: document.getElementById("professor").value,
    data: document.getElementById("data").value,
    hora: document.getElementById("hora").value
});


    closeForm();
    atualizarAgenda();
}

// modo cinema
function toggleCinema() {
    document.body.style.background = document.body.style.background === "black" ? "#f5f5f5" : "black";
}

// daltonismo
function toggleDaltonismo() {
    document.body.style.filter = document.body.style.filter ? "" : "grayscale(80%)";
}
function deleteEvent(id) {
    eventos = eventos.filter(ev => ev.id !== id);
    atualizarAgenda();
}
