const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Dirección IP del servidor de correo
    port: 465, // Puerto por defecto para SMTP
    secure: true,
    auth: {
      user: 'gc786041@gmail.com', // Usuario del servidor de correo
      pass: 'mlct nhnq effw axmm' // Contraseña del usuario
    },
});

transporter.verify().then(() => {
    console.log('Ready for send email');
});

module.exports = {
    transporter: transporter
};