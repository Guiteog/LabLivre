function carregar(pagina) {
    const iframe = document.getElementById('pagina');
    if (!iframe) return console.error('iframe não encontrado');
    iframe.src = pagina;
}