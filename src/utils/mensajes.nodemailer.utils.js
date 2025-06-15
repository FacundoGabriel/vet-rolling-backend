const transporter = require("../helpers/nodemailer.helpers");

const registroExitoso = async (userEmail, nameUser) => {
  const info = await transporter.sendMail({
    from: `"RollingVet 🐾" <${process.env.GMAIL_USER}>`,
    to: userEmail,
    subject: `¡Bienvenido/a a RollingVet, ${nameUser}!`,
    text: "Gracias por registrarte en RollingVet. Ya podés disfrutar de todos nuestros servicios.",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
        <div style="text-align: center;">
          <img src="https://sdmntprwestus2.oaiusercontent.com/files/00000000-2238-61f8-abc9-48a8c9442340/raw?se=2025-06-15T01%3A19%3A45Z&sp=r&sv=2024-08-04&sr=b&scid=d331189d-4ba2-5bcf-8a7c-e92567570e6c&skoid=24a7dec3-38fc-4904-b888-8abe0855c442&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-06-14T21%3A55%3A59Z&ske=2025-06-15T21%3A55%3A59Z&sks=b&skv=2024-08-04&sig=y70o/wBe/GEcq/g4xK4zFC2GqPfKrUJN38B6wTaVYyc%3D" alt="RollingVet" style="width: 300px; border-radius: 10px;"/>
          <h1 style="color: #2e8b57;">¡Hola ${nameUser}!</h1>
          <p style="font-size: 18px;">
            Gracias por registrarte en <strong>RollingVet</strong>. 🐶🐱
          </p>
          <p style="font-size: 16px;">
            Ya podés acceder a tu cuenta y descubrir todos nuestros servicios para el cuidado de tus mascotas.
          </p>
          <a href="https://youtube.com/" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #2e8b57; color: #fff; text-decoration: none; border-radius: 5px;">
            Ir a mi cuenta
          </a>
          <p style="margin-top: 30px; font-size: 14px; color: #777;">
            Si tenés alguna duda o problema, no dudes en contactarnos.
          </p>
        </div>
      </div>
    `,
  });

  console.log(info);

  return {
    info: info.response.includes("OK"),
    rejected: info.rejected,
  };
};

module.exports = {
  registroExitoso,
};