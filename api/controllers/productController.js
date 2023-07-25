const ProductsModel = require("../models/products");

async function createProduct(req, res) {
  let data = req.body;

  await ProductsModel.create(data)
    .then(() => {
      return res.json({
        error: false,
        message: "Produto cadastrado com sucesso!",
      });
    })
    .catch(() => {
      return res.status(400).json({
        error: true,
        message: "Erro: Produto não cadastrado com sucesso!",
      });
    });
}

async function getProducts(req, res) {
  console.log(res);
  await ProductsModel.findAll({
    attributes: ["id", "product_name", "product_type", "product_wheight"],
    order: [["id", "DESC"]],
  })
    .then((products) => {
      return res.json({
        error: false,
        products,
      });
    })
    .catch(() => {
      return res.status(400).json({
        error: true,
        message: "Erro: Nenhum produto encontrado!",
      });
    });
}

async function updateProduct(req, res) {
  const productId = req.params.id;
  const newData = req.body;

  try {
    const product = await ProductsModel.findByPk(productId);
    if (!product) {
      return res
        .status(404)
        .json({ erro: true, message: "Produto não encontrado" });
    }

    product.product_name = newData.product_name || product.product_name;
    product.product_type = newData.product_type || product.product_type;
    product.product_wheight =
      newData.product_wheight || product.product_wheight;

    await product.save();
    return res.json({
      erro: false,
      message: "Produto atualizado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    return res.status(500).json({ erro: true, message: "Erro no servidor" });
  }
}

async function deleteProduct(req, res) {
  const productId = req.params.id;

  try {
    const product = await ProductsModel.findByPk(productId);
    if (!product) {
      return res
        .status(404)
        .json({ erro: true, message: "Produto não encontrado" });
    }

    await product.destroy();
    return res.json({
      erro: false,
      message: "Produto deletado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    return res.status(500).json({ erro: true, message: "Erro no servidor" });
  }
}

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
