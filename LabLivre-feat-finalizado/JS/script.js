function carregar(pagina) {
    const iframe = document.getElementById('pagina');
    if (!iframe) return console.error('iframe não encontrado');
    iframe.src = pagina;
}

document.getElementById("nome").innerText = localStorage.getItem("nomeUser");
document.getElementById("email").innerText = localStorage.getItem("emailUser");

document.getElementById('btn-sair').addEventListener('click', function(event) {
        window.location.href = 'login.html';
    });