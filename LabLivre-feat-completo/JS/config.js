// Mostrar/esconder o card de tema
document.getElementById("abrirTema").onclick = () => {
    const card = document.getElementById("cardTema");
    card.style.display = card.style.display === "block" ? "none" : "block";
};


// Função para abrir o link do GitHub
function abrirGitHub() {
    window.open("https://github.com/Guiteog/LabLivre.git", "_blank");
}


// Alterar o tema
function mudarTema(tipo) {
    if (tipo === "escuro") {
        document.body.classList.add("escuro");
        localStorage.setItem("tema", "escuro");
    } else {
        document.body.classList.remove("escuro");
        localStorage.setItem("tema", "claro");
    }
}


// Carregar tema salvo
const salvo = localStorage.getItem("tema");
if (salvo === "escuro") {
    document.body.classList.add("escuro");
}
