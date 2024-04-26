const express = require("express");
require("./db/connection");
const cors = require("cors");
const multer = require("multer");
const path = require("node:path");
const app = express();
const port = process.env.port || 3000;
app.use(express.json());
app.use(cors());
require("dotenv").config();

const productController = require("./Controllers/Crud");
const userController = require("./Controllers/User");
const contactController = require("./Controllers/Contact");
const paymentGatewayController = require("./Controllers/Payment");
const userAddrController = require("./Controllers/UserAddr");

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });
app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    Image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

app.get("/", (req, res) => {
  res.send("Hello World ");
});

app.post("/addProduct", productController.addProduct);
app.get("/allProduct", productController.getallproduct);
app.delete("/delete/:id", productController.removeproduct);
app.put("/update/:id", productController.updatedProduct);

app.post("/login", userController.login);
app.post("/signup", userController.signup);
app.post("/Contactform", contactController.contactForm);
app.post("/create-checkout-session", paymentGatewayController.paymentGateway);
app.post("/forgot-password", userController.forgotPassword);
app.post("/reset-password/:token", userController.resetPassword);
app.post("/user-Address", userAddrController.userAddr);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
