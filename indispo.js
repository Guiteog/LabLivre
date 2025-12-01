let eventos = [];

// Renderiza a agenda separando equipamentos e salas
function atualizarAgenda() {
    const eqp = document.getElementById("equipamentos");
    const sal = document.getElementById("salas");

    eqp.innerHTML = "";
    sal.innerHTML = "";

    eventos.forEach(ev => {

        const card = `
        <div class="card">
            <img src="${ev.img}">
            <h3>${ev.titulo}</h3>

            <p><b>Previsão:</b> ${ev.data}</p>
            <p>${ev.descricao}</p>

            <button class="btn-delete" onclick="deleteEvent(${ev.id})">Remover</button>
        </div>
        `;

        // Separa por tipo
        if (ev.tipo === "equipamento") {
            eqp.innerHTML += card;
        } else {
            sal.innerHTML += card;
        }
    });
}

// Abrir modal
function openForm() {
    document.getElementById("modal").classList.remove("hidden");
}

// Fechar modal
function closeForm() {
    document.getElementById("modal").classList.add("hidden");
}

// Converter imagem para Base64
function loadImage(file, callback) {
    const reader = new FileReader();
    reader.onload = e => callback(e.target.result);
    reader.readAsDataURL(file);
}

// Adicionar evento
function addEvent(e) {
    e.preventDefault();

    const file = document.getElementById("img").files[0];

    // Se tiver imagem, converte para Base64
    if (file) {
        loadImage(file, (base64) => {
            salvarEvento(base64);
        });
    } else {
        // Se não tiver imagem, usa uma padrão
        salvarEvento("https://i.imgur.com/zuQW9Vm.jpeg");
    }
}

function salvarEvento(imgData) {

    const dataBr = (() => {
        const v = document.getElementById("data").value.split("-");
        return `${v[2]}/${v[1]}/${v[0]}`;
    })();

    eventos.push({
        id: Date.now(),
        titulo: document.getElementById("titulo").value,
        descricao: document.getElementById("descricao").value,
        tipo: document.getElementById("tipo").value,
        img: imgData,
        data: dataBr
    });

    document.getElementById("titulo").value = "";
    document.getElementById("tipo").value = "";
    document.getElementById("img").value = "";
    document.getElementById("data").value = "";

    closeForm();
    atualizarAgenda();
}

// Deletar
function deleteEvent(id) {
    eventos = eventos.filter(ev => ev.id !== id);
    atualizarAgenda();
}
