const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Seu e-mail
        pass: process.env.EMAIL_PASS  // Sua senha ou app password
    }
});

app.post("/send", async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Mensagem vazia" });
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "destino@gmail.com", // E-mail para onde serão enviadas as sugestões
        subject: "Nova Sugestão Anônima",
        text: message
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: "Obrigado pelo feedback" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao enviar e-mail" });
    }
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
