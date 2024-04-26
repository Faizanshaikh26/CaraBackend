const mongoose = require("mongoose");
const { Schema } = mongoose;
const ProductSchema = new Schema({
  id: { type: Number, required: true },
  Imgg: { type: String, required: true },
  Brand: { type: String, required: true },
  Name: { type: String, required: true },
  StarRating: { type: Number, min: 1, max: 6 },
  Price: { type: String, required: true },
  Product_Des: { type: String, required: true },
  Main_Img: { type: String, required: true },
  Small_img1: { type: String, required: true },
  Small_img2: { type: String, required: true },
  Small_img3: { type: String, required: true },
  Small_img4: { type: String, required: true },
  Category: { type: String, required: true },
});
exports.Product = mongoose.model("Product", ProductSchema);


