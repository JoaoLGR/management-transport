const FreightsModel = require("../models/freights");

async function createFreight(req, res) {
  let data = req.body;

  await FreightsModel.create(data)
    .then(() => {
      return res.json({
        error: false,
        message: "Frete cadastrado com sucesso!",
      });
    })
    .catch(() => {
      return res.status(400).json({
        error: true,
        message: "Erro: Frete não cadastrado com sucesso!",
      });
    });
}

async function getFreights(req, res) {
  await FreightsModel.findAll({
    attributes: [
      "id",
      "product",
      "product_wheight",
      "vehicle",
      "vehicle_wheight",
      "kms",
      "freight",
      "rate",
      "delivery_value",
    ],
    order: [["id", "DESC"]],
  })
    .then((freights) => {
      return res.json({
        error: false,
        freights,
      });
    })
    .catch(() => {
      return res.status(400).json({
        error: true,
        message: "Erro: Nenhum frete encontrado!",
      });
    });
}

async function updateFreight(req, res) {
  const freightId = req.params.id;
  const newData = req.body;

  try {
    const freight = await FreightsModel.findByPk(freightId);
    if (!freight) {
      return res
        .status(404)
        .json({ error: true, message: "Frete não encontrado" });
    }

    freight.product = newData.product || freight.product;
    freight.product_wheight =
      newData.product_wheight || freight.product_wheight;
    freight.vehicle = newData.vehicle || freight.vehicle;
    freight.vehicle_wheight =
      newData.vehicle_wheight || freight.vehicle_wheight;
    freight.kms = newData.kms || freight.kms;
    freight.freight = newData.freight || freight.freight;
    freight.rate = newData.rate || freight.rate;
    freight.delivery_value = newData.delivery_value || freight.delivery_value;

    await freight.save();
    return res.json({
      error: false,
      message: "Frete atualizado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao atualizar frete:", error);
    return res.status(500).json({ error: true, message: "Erro no servidor" });
  }
}

async function deleteFreight(req, res) {
  const freightId = req.params.id;

  try {
    const freight = await FreightsModel.findByPk(freightId);
    if (!freight) {
      return res
        .status(404)
        .json({ error: true, message: "Frete não encontrado" });
    }

    await freight.destroy();
    return res.json({
      error: false,
      message: "Frete deletado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao deletar frete:", error);
    return res.status(500).json({ error: true, message: "Erro no servidor" });
  }
}

module.exports = {
  createFreight,
  getFreights,
  updateFreight,
  deleteFreight,
};
