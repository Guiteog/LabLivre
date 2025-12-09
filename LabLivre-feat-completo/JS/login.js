function login() {
    const email = document.getElementById("email").value.trim();


    if (!email) {
        alert("Por favor, digite seu e-mail!");
        return;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        alert("Digite um e-mail válido! Exemplo: nome@senai.org.br");
        return;
    }

    // Enviar para o servidor
    fetch("http://localhost:3030/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
    })
    .then(async res => {
        const resposta = await res.json();

        if (res.status === 400) {
            alert("Você precisa informar o e-mail!");
            return;
        }

        if (res.status === 401) {
            alert("Esse e-mail não está cadastrado!");
            return;
        }

        if (res.status >= 500) {
            alert("Erro no servidor. Tente novamente mais tarde.");
            return;
        }

        if (resposta.status === true) {
            localStorage.setItem("cpfUser", resposta.dadosUser.cpf);
            localStorage.setItem("emailUser", email);

            window.location.href = "2FA.html";
        }
    })
    .catch(err => {
        console.error("Erro ao conectar com o servidor:", err);
        alert("Falha na conexão com o servidor.");
    });
}