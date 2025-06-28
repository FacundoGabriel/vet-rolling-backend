const {
  registrarUsuarioBD,
  iniciarSesionUsuarioDB,
  altaLogicaUsuarioPorIdBD,
  bajaLogicaUsuarioPorIdBD,
  bajaFisicaUsuarioPorIdBD,
  editarInfoUsuarioPorIdBD,
  cambiarContraseniaUsuarioBD,
  obtenerTodosLosUsuariosDB,
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
  const { msg, statusCode, token, error } = await iniciarSesionUsuarioDB(
    req.body
  );
  try {
    res.status(statusCode).json({ msg, statusCode, token });
  } catch {
    res.status(statusCode).json(error);
  }
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

module.exports = {
  registrarUsuario,
  iniciarSesionUsuario,
  altaLogicaUsuarioPorId,
  bajaLogicaUsuarioPorId,
  bajaFisicaUsuarioPorId,
  editarInfoUsuarioPorId,
  cambiarContraseniaUsuario,
  obtenerTodosLosUsuarios,
};
