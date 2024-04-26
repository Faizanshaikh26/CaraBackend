
const model = require("../Models/Product");
const Product = model.Product;

exports.addProduct = async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json({
    success: 1,
    Name: req.body.Name,
  });
};

exports.getallproduct = async (req, res) => {
  const fetchedproduct = await Product.find({});
  res.json(fetchedproduct);
  // console.log("fetched");
  // console.log(fetchedproduct);
};
exports.removeproduct = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.json({
      success: true,
      message: "Product deleted successfully",
      deletedProduct: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
exports.updatedProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        $set: req.body, 
      },
      { new: true } 
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (error) {
    
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
