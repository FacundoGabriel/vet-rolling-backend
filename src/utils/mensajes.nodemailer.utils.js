const transporter = require("../helpers/nodemailer.helpers");

const registroExitoso = async (userEmail, nameUser, token) => {
  const info = await transporter.sendMail({
    from: `"RollingVet 🐾" <${process.env.GMAIL_USER}>`,
    to: userEmail,
    subject: `¡Bienvenido/a a RollingVet, ${nameUser}!`,
    text: "Gracias por registrarte en RollingVet. Para poder disfrutar de todos nuestros servicios, solo necesitas habilitar tu cuenta.",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
        <div style="text-align: center;">
          <h1 style="color:rgba(0, 89, 255, 0.82);">¡Hola ${nameUser}!</h1>
          <p style="font-size: 18px;">
            Gracias por registrarte en <strong>RollingVet</strong>. 🐶🐱
          </p>
          <p style="font-size: 16px;">
            Haz click en el seguiente boton para habilitar tu cuenta!.
          </p>
          <a href="${process.env.FRONT_URL}/habilitar-cuenta?token=${token}" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color:rgb(1, 81, 255); color: #fff; text-decoration: none; border-radius: 5px;">
            Habilitar mi cuenta
          </a>
          <p style="margin-top: 30px; font-size: 14px; color: #777;">
            Si tenés alguna duda o problema, no dudes en contactarnos.
          </p>
        </div>
      </div>
    `,
  });

  return {
    info: info.response.includes("OK"),
    rejected: info.rejected,
  };
};

const cuentaHabilitadaVeterinario = async (userEmail, nameUser) => {
  const info = await transporter.sendMail({
    from: `"RollingVet 🐾" <${process.env.GMAIL_USER}>`,
    to: userEmail,
    subject: `Tu cuenta de Veterinario en RollingVet ha sido habilitada, ${nameUser}!`,
    text: `Hola ${nameUser}, tu cuenta de veterinario en RollingVet ha sido habilitada. Ya podés iniciar sesión y ofrecer tus servicios. ¡Gracias por formar parte de nuestra comunidad!`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
        <div style="text-align: center;">
          <h1 style="color:rgb(2, 81, 228);">¡Hola ${nameUser}!</h1>
          <p style="font-size: 18px;">
            Tu cuenta de <strong>veterinario</strong> en <strong>RollingVet</strong> ha sido habilitada.
          </p>
          <p style="font-size: 16px;">
            Ya podés iniciar sesión y comenzar a ofrecer tus servicios a nuestra comunidad.
          </p>
          <a href="${process.env.FRONT_URL}/login" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color:rgb(11, 94, 248); color: #fff; text-decoration: none; border-radius: 5px;">
            Ir a iniciar sesión
          </a>
          <p style="margin-top: 30px; font-size: 14px; color: #777;">
            Si tenés alguna consulta, no dudes en contactarnos.
          </p>
        </div>
      </div>
    `,
  });

  return info;
};

const recuperarContrasenia = async (userEmail, token) => {
  await transporter.sendMail({
    from: `"Rolling vet" <${process.env.GMAIL_USER}>`,
    to: `${userEmail}`,
    subject: `Recuperá el acceso a tu cuenta en Rolling vet`,
    text: "Hacé clic en el enlace para recuperar tu contraseña.",
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
        <h2>¡Hola! Sabemos que a veces se nos olvidan las cosas...</h2>
        <p>Hacé clic en el botón de abajo para recuperar el acceso a tu cuenta y seguir cuidando a tus mascotas 🐾</p>
        <a href="${process.env.FRONT_URL}/olvide-contraseña?token=${token}" 
           style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color:rgb(0, 89, 255); 
           color: white; text-decoration: none; border-radius: 5px;">Recuperar Contraseña</a>
        <p style="margin-top: 20px; color: #777;">Si no solicitaste este correo, podés ignorarlo.</p>
      </div>
    `,
  });
};

const contactoFormulario = async (nombre, email, mensaje) => {
  const info = await transporter.sendMail({
    from: `"RollingVet 🐾" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Hemos recibido tu consulta",
    text: "Hello world?",
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 30px; border-radius: 8px; max-width: 600px; margin: auto; color: #333;">
        <h2 style="color: #00466e;">Hola ${nombre},</h2>
  
        <p style="font-size: 16px;">
          Muchas gracias por comunicarte con nosotros. Recibimos tu mensaje y en breve uno de nuestros profesionales se pondrá en contacto contigo para ayudarte a vos y a tu peludito.
        </p>

        <p style="font-size: 16px;">
          Nos importa el bienestar de tus mascotas, y estamos aquí para brindarles el mejor cuidado posible.
        </p>

        <div style="background-color: #eef3f7; padding: 15px; border-left: 4px solid #00466e; margin: 20px 0; border-radius: 4px;">
          <p style="margin: 0;"><strong>Tu mensaje:</strong></p>
          <p style="margin: 5px 0 0 0; white-space: pre-wrap;">${mensaje}</p>
        </div>

        <p style="font-size: 14px; color: #555;">
          Si tu consulta es urgente, te recomendamos llamarnos directamente o visitarnos en nuestra clínica. Todos los datos están disponibles en nuestra web o redes sociales.
        </p>

        <p style="font-size: 14px; color: #555;">Saludos cordiales,<br><strong>El equipo de RollingVet 🐾</strong></p>
      </div>
    `,
  });
};
const enviarConfirmacionPlan = async (
  nombre,
  email,
  nombreMascota,
  nombrePlan
) => {
  const info = await transporter.sendMail({
    from: `"RollingVet 🐾" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "¡Plan contratado exitosamente!",
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 30px; border-radius: 8px; max-width: 600px; margin: auto; color: #333;">
        <h2 style="color: #00466e;">Hola ${nombre},</h2>

        <p style="font-size: 16px;">
          ¡Gracias por confiar en RollingVet! Te confirmamos que el plan <strong>${nombrePlan}</strong> ha sido contratado con éxito para tu mascota <strong>${nombreMascota}</strong>.
        </p>

        <p style="font-size: 16px;">
          A partir de ahora, tu mascota cuenta con todos los beneficios y cuidados que este plan ofrece.
        </p>

        <div style="background-color: #eef3f7; padding: 15px; border-left: 4px solid #00466e; margin: 20px 0; border-radius: 4px;">
          <p style="margin: 0;"><strong>Mascota:</strong> ${nombreMascota}</p>
          <p style="margin: 0;"><strong>Plan contratado:</strong> ${nombrePlan}</p>
        </div>

        <p style="font-size: 14px; color: #555;">
          Si tenés dudas o necesitás ayuda, no dudes en comunicarte con nosotros.
        </p>

        <p style="font-size: 14px; color: #555;">Saludos cordiales,<br><strong>El equipo de RollingVet 🐾</strong></p>
      </div>
    `,
  });
};

module.exports = {
  registroExitoso,
  cuentaHabilitadaVeterinario,
  recuperarContrasenia,
  contactoFormulario,
  enviarConfirmacionPlan,
};
