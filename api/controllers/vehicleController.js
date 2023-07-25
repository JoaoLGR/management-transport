const VehicleModel = require("../models/vehicle");

async function createVehicle(req, res) {
  let data = req.body;

  await VehicleModel.create(data)
    .then(() => {
      return res.json({
        error: false,
        message: "Veículo cadastrado com sucesso!",
      });
    })
    .catch(() => {
      return res.status(400).json({
        error: true,
        message: "Erro: Veículo não cadastrado com sucesso!",
      });
    });
}

async function getVehicles(req, res) {
  await VehicleModel.findAll({
    attributes: ["id", "vehicle_name", "vehicle_type", "max_wheight"],
    order: [["id", "DESC"]],
  })
    .then((vehicles) => {
      return res.json({
        error: false,
        vehicles,
      });
    })
    .catch(() => {
      return res.status(400).json({
        error: true,
        message: "Erro: Nenhum veículo encontrado!",
      });
    });
}

async function updateVehicle(req, res) {
  const vehicleId = req.params.id;
  const newData = req.body;

  try {
    const vehicle = await VehicleModel.findByPk(vehicleId);
    if (!vehicle) {
      return res
        .status(404)
        .json({ erro: true, message: "Veículo não encontrado" });
    }

    vehicle.vehicle_name = newData.vehicle_name || vehicle.vehicle_name;
    vehicle.vehicle_type = newData.vehicle_type || vehicle.vehicle_type;
    vehicle.max_wheight = newData.max_wheight || vehicle.max_wheight;

    await vehicle.save();
    return res.json({
      erro: false,
      message: "Veículo atualizado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao atualizar veículo:", error);
    return res.status(500).json({ erro: true, message: "Erro no servidor" });
  }
}

async function deleteVehicle(req, res) {
  const vehicleId = req.params.id;

  try {
    const vehicle = await VehicleModel.findByPk(vehicleId);
    if (!vehicle) {
      return res
        .status(404)
        .json({ erro: true, message: "Veículo não encontrado" });
    }

    await vehicle.destroy();
    return res.json({
      erro: false,
      message: "Veículo deletado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao deletar veículo:", error);
    return res.status(500).json({ erro: true, message: "Erro no servidor" });
  }
}

module.exports = {
  createVehicle,
  getVehicles,
  updateVehicle,
  deleteVehicle,
};
