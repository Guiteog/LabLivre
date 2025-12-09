const toggleBtn = document.getElementById("toggleBtn");
const btnText = document.getElementById("btnText");

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("daltonismo");

    if (document.body.classList.contains("daltonismo")) {
        btnText.textContent = "Desativar Daltonismo Seguro";
    } else {
        btnText.textContent = "Ativar Daltonismo Seguro";
    }
});
