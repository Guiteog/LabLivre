function validar2FA() {
    const token = document.getElementById("codigo").value.trim();  
    const cpf = localStorage.getItem("cpfUser");

    if (!token) {
        alert("Digite o código enviado para seu e-mail!");
        return;
    }

    if (token.length !== 6 || isNaN(token)) {   //isNan= verifica se é numero
    alert("O código deve conter exatamente 6 números!");
    return;
}

    // Enviar para o servidor
    fetch("http://localhost:3030/verificaToken", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, cpf })
    })
    .then(async res => {
        const resposta = await res.json();

        if (res.status === 400) {
            alert("Você precisa informar o código!");
            return;
        }

        if (res.status === 401) {
            alert("Código inválido ou expirado!");
            return;
        }

        if (res.status >= 500) {
            alert("Erro no servidor. Tente novamente em alguns minutos.");
            return;
        }

        if (resposta.status === true) {
            localStorage.setItem("nomeUser", resposta.dadosUser.nome);
            localStorage.setItem("emailUser", resposta.dadosUser.email);
            localStorage.setItem("perfilUser", resposta.dadosUser.perfil);

            window.location.href = "home.html";
        }
    })
    .catch(err => {
        console.error("Erro ao conectar com o servidor:", err);
        alert("Falha na conexão com o servidor.");
    });
}