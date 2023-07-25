const UserModel = require("../models/user");
const bcrypt = require("bcryptjs");

async function createUser(req, res) {
  let data = req.body;

  data.password = await bcrypt.hash(data.password, 8);

  await UserModel.create(data)
    .then(() => {
      return res.json({
        error: false,
        message: "Usuário cadastrado com sucesso!",
      });
    })
    .catch(() => {
      return res.status(400).json({
        error: true,
        message: "Erro: Usuário não cadastrado com sucesso!",
      });
    });
}

async function getUsers(req, res) {
  await UserModel.findAll({
    attributes: ["id", "user_name", "email", "password"],
    order: [["id", "DESC"]],
  })
    .then((users) => {
      return res.json({
        error: false,
        users,
        id_user_logged: req.userId,
      });
    })
    .catch(() => {
      return res.status(400).json({
        error: true,
        message: "Erro: Nenhum usuário encontrado!",
      });
    });
}

async function updateUser(req, res) {
  const userId = req.params.id;
  const newData = req.body;

  try {
    const user = await UserModel.findByPk(userId);
    if (!user) {
      return res
        .status(404)
        .json({ erro: true, message: "Usuário não encontrado" });
    }

    user.user_name = newData.user_name || user.user_name;
    user.email = newData.email || user.email;

    await user.save();
    return res.json({
      erro: false,
      message: "Usuário atualizado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return res.status(500).json({ erro: true, message: "Erro no servidor" });
  }
}

async function deleteUser(req, res) {
  const userId = req.params.id;

  try {
    const user = await UserModel.findByPk(userId);
    if (!user) {
      return res
        .status(404)
        .json({ erro: true, message: "Usuário não encontrado" });
    }

    await user.destroy();
    return res.json({
      erro: false,
      message: "Usuário deletado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    return res.status(500).json({ erro: true, message: "Erro no servidor" });
  }
}

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
};
