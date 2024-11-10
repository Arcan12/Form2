// Validação de email usando a expressão regular fornecida
const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("userForm");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            // Coleta dos valores dos campos do formulário
            const nome = form.nome.value.trim();
            const sobrenome = form.sobrenome.value.trim();
            const email = form.email.value.trim();
            const idade = parseInt(form.idade.value.trim(), 10);

            // Validação dos campos
            if (nome.length < 3 || nome.length > 50 || sobrenome.length < 3 || sobrenome.length > 50) {
                alert("Nome e Sobrenome devem ter entre 3 e 50 caracteres.");
                return;
            }

            if (!emailPattern.test(email)) {
                alert("Por favor, insira um email válido.");
                return;
            }

            if (isNaN(idade) || idade < 1 || idade > 120) {
                alert("A idade deve ser um número entre 1 e 120.");
                return;
            }

            // Redirecionamento para a página de confirmação com dados no localStorage
            localStorage.setItem("formData", JSON.stringify({ nome, sobrenome, email, idade }));
            window.location.href = "confirmation.html";
        });
    }

    // Exibição dos dados na página confirmation.html
    const confirmNome = document.getElementById("confirmNome");
    const confirmSobrenome = document.getElementById("confirmSobrenome");
    const confirmEmail = document.getElementById("confirmEmail");
    const confirmIdade = document.getElementById("confirmIdade");
    const confirmButton = document.getElementById("confirmButton");

    if (confirmNome && confirmButton) {
        const formData = JSON.parse(localStorage.getItem("formData"));

        if (formData) {
            confirmNome.textContent = formData.nome;
            confirmSobrenome.textContent = formData.sobrenome;
            confirmEmail.textContent = formData.email;
            confirmIdade.textContent = formData.idade;

            confirmButton.addEventListener("click", () => {
                // Salvando os dados em data.json (simulação de salvamento)
                localStorage.setItem("data", JSON.stringify(formData));
                alert("Dados salvos com sucesso!");
                window.location.href = "index.html";
            });
        }
    }
});
