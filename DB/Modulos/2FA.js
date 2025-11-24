// ./Modulos/emailService.js

const nodemailer = require('nodemailer');

// --- ⚠️ CONFIGURAÇÃO DO TRANSPORTER (ETHEREAL) ⚠️ ---
// ESTE SERVIÇO É 100% GRATUITO PARA TESTES.
// 1. Acesse: https://ethereal.email/
// 2. Crie uma conta de teste e substitua 'user' e 'pass' abaixo.
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email', 
    port: 587, 
    secure: false, // Ethereal usa TLS (porta 587)
    auth: {
        user: 'vincenzo.dibbert@ethereal.email', // ⬅️ SUBSTITUA
        pass: 'GgMXjQSePQPHbZ5955', // ⬅️ SUBSTITUA
    }
});


/**
 * Envia o código 2FA para o e-mail do destinatário usando o Nodemailer.
 * @param {string} toEmail - O endereço de e-mail do destinatário.
 * @param {string} code2FA - O código temporário de 6 dígitos.
 */
function send2FACode(toEmail, code2FA) {
    const mailOptions = {
        from: '"Sistema LabLivre" <teste@lablivre.com.br>',
        to: toEmail,
        subject: 'Seu Código de Acesso Único (2FA)',
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; max-width: 600px; margin: auto;">
                <h2 style="color: #004d40;">Autenticação de Dois Fatores</h2>
                <p>Olá,</p>
                <p>Você solicitou um código de acesso para completar seu login. Por favor, use o código abaixo:</p>
                
                <div style="background-color: #f4f4f4; padding: 15px; text-align: center; border-radius: 8px; margin: 20px 0;">
                    <strong style="font-size: 24px; color: #d32f2f;">${code2FA}</strong>
                </div>
                
                <p>Este código é válido por **5 minutos**.</p>
                <p style="font-size: 12px; color: #777;">Se você não tentou logar, ignore este e-mail. Sua senha está segura.</p>
                <p style="margin-top: 30px;">Atenciosamente,<br>Equipe LabLivre</p>
            </div>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("ERRO AO ENVIAR E-MAIL:", error);
        } else {
            console.log('E-mail 2FA enviado com sucesso:', info.response);
            // URL de visualização de teste (funciona apenas com Ethereal):
            console.log('URL de Pré-visualização do E-mail:', nodemailer.getTestMessageUrl(info));
        }
    });
}

module.exports = {
    send2FACode
}