const {
  registrarUsuarioBD,
  iniciarSesionUsuarioDB,
  altaLogicaUsuarioPorIdBD,
  bajaLogicaUsuarioPorIdBD,
  bajaFisicaUsuarioPorIdBD,
  editarInfoUsuarioPorIdBD,
  cambiarContraseniaUsuarioBD,
  obtenerTodosLosUsuariosDB,
  obtenerUnUsuarioPorIdBD,
  agregarImagenUsuarioArray,
  cambiarContraseniaRecuperacionBD,
  recuperarContraseniaUsuarioBD,
} = require("../services/usuarios.services");

const registrarUsuario = async (req, res) => {
  const { msg, statusCode, error } = await registrarUsuarioBD(req.body);

  try {
    res.status(statusCode).json({ msg, statusCode });
  } catch {
    res.status(statusCode).json(error);
  }
};

const iniciarSesionUsuario = async (req, res) => {
  const {
    msg,
    statusCode,
    token,
    error,
    idUsuario,
    rolUsuario,
    nombreUsuario,
  } = await iniciarSesionUsuarioDB(req.body);
  try {
    res
      .status(statusCode)
      .json({ msg, idUsuario, statusCode, token, rolUsuario, nombreUsuario });
  } catch {
    res.status(statusCode).json(error);
  }
};

const agregarImagenUsuario = async (req, res) => {
  const { statusCode, msg } = await agregarImagenUsuarioArray(
    req.params.id,
    req.file
  );
  res.status(statusCode).json({ msg });
};

const altaLogicaUsuarioPorId = async (req, res) => {
  const { msg, statusCode, error } = await altaLogicaUsuarioPorIdBD(
    req.params.id
  );
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};
const bajaLogicaUsuarioPorId = async (req, res) => {
  const { msg, statusCode, error } = await bajaLogicaUsuarioPorIdBD(
    req.params.id
  );
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};
const bajaFisicaUsuarioPorId = async (req, res) => {
  const { msg, statusCode, error } = await bajaFisicaUsuarioPorIdBD(
    req.params.id
  );
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const editarInfoUsuarioPorId = async (req, res) => {
  const { msg, statusCode, error } = await editarInfoUsuarioPorIdBD(
    req.params.id,
    req.body
  );
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const cambiarContraseniaUsuario = async (req, res) => {
  const { msg, statusCode, error } = await cambiarContraseniaUsuarioBD(
    req.params.id,
    req.body
  );
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const obtenerTodosLosUsuarios = async (req, res) => {
  const { usuarios, statusCode, error } = await obtenerTodosLosUsuariosDB();
  try {
    res.status(statusCode).json({ usuarios });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const obtenerUnUsuarioPorId = async (req, res) => {
  const { usuario, msg, statusCode, error } = await obtenerUnUsuarioPorIdBD(
    req.params.id,
    req
  );
  try {
    res.status(statusCode).json(msg ? { msg } : { usuario });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const recuperarContraseniaUsuario = async (req, res) => {
  const { msg, statusCode, error } = await recuperarContraseniaUsuarioBD(
    req.body.emailUsuario
  );
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const cambiarContraseniaRecuperacion = async (req, res) => {
  const token = req.header("authRecovery");

  const { msg, statusCode, error } = await cambiarContraseniaRecuperacionBD(
    token,
    req.body.nuevaContrasenia
  );
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

module.exports = {
  registrarUsuario,
  iniciarSesionUsuario,
  agregarImagenUsuario,
  altaLogicaUsuarioPorId,
  bajaLogicaUsuarioPorId,
  bajaFisicaUsuarioPorId,
  editarInfoUsuarioPorId,
  cambiarContraseniaUsuario,
  obtenerTodosLosUsuarios,
  obtenerUnUsuarioPorId,
  recuperarContraseniaUsuario,
  cambiarContraseniaRecuperacion,
};
