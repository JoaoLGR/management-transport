const express = require("express");
const { eAdmin } = require("./auth/index");
const UserModel = require("./models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger.json");
const usersRoutes = require("./controllers/userController");
const productsRoutes = require("./controllers/productController");
const vehiclesRoutes = require("./controllers/vehicleController");
const freightsRoutes = require("./controllers/freightController");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// routes of users
app.post("/createUser", usersRoutes.createUser);
app.get("/users", eAdmin, usersRoutes.getUsers);
app.put("/users/:id", usersRoutes.updateUser);
app.delete("/users/:id", usersRoutes.deleteUser);

// routes of products
app.post("/createProduct", productsRoutes.createProduct);
app.get("/products", eAdmin, productsRoutes.getProducts);
app.put("/products/:id", productsRoutes.updateProduct);
app.delete("/products/:id", productsRoutes.deleteProduct);

// router of vehicles
app.post("/createVehicle", vehiclesRoutes.createVehicle);
app.get("/vehicles", eAdmin, vehiclesRoutes.getVehicles);
app.put("/vehicles/:id", vehiclesRoutes.updateVehicle);
app.delete("/vehicles/:id", vehiclesRoutes.deleteVehicle);

//routes of freights
app.post("/createFreight", freightsRoutes.createFreight);
app.get("/freights", eAdmin, freightsRoutes.getFreights);
app.put("/freights/:id", freightsRoutes.updateFreight);
app.delete("/freights/:id", freightsRoutes.deleteFreight);

app.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({
      attributes: ["id", "user_name", "email", "password"],
      where: {
        email: req.body.email,
      },
    });

    if (user === null) {
      return res.status(400).json({
        error: true,
        message:
          "Erro: Usuário ou a senha incorreta! Nenhum usuário com este e-mail",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        error: true,
        message: "Erro: Usuário ou a senha incorreta! Senha incorreta!",
      });
    }

    var token = jwt.sign({ id: user.id }, "D62ST92Y7A6V7K5C6W9ZU6W8KS3", {
      expiresIn: "1h",
    });

    return res.json({
      error: false,
      message: "Login realizado com sucesso!",
      token,
    });
  } catch (errorr) {
    console.errorr("Erro durante o login:", errorr);
    return res.status(500).json({ error: true, message: "Erro no servidor" });
  }
});

app.listen(3001, () => {
  console.log("Servidor iniciado na porta 3001: http://localhost:3001");
  console.log("Documentação da api no link: http://localhost:3001/docs");
});
