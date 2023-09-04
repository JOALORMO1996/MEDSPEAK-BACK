const nodemailer = require('nodemailer');

// Configuración de nodemailer
const emailRestablecerPass = async (correoDestino, asunto, mensaje) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port:2525,
      auth: {
        user: "aca3df6e3871b9",
        pass: "14510fc524f8fb"
      },
    });

    const info = await transporter.sendMail({
      from: 'MedSpeak@correo.com', 
      to: correoDestino, 
      subject: asunto,
      html: mensaje,
    });

    console.log('Correo enviado:', info.response);
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
};

module.exports = {
  emailRestablecerPass
};