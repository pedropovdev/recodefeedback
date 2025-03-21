document.getElementById("feedbackForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const message = document.getElementById("message").value;
    const responseMessage = document.getElementById("responseMessage");

    if (message.trim() === "") {
        responseMessage.textContent = "Por favor, digite uma mensagem antes de enviar.";
        responseMessage.style.color = "red";
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });

        const result = await response.json();
        responseMessage.textContent = result.success || result.error;
        responseMessage.style.color = response.ok ? "green" : "red";

        if (response.ok) {
            document.getElementById("feedbackForm").reset();
        }
    } catch (error) {
        responseMessage.textContent = "Erro ao conectar com o servidor.";
        responseMessage.style.color = "red";
    }
});
