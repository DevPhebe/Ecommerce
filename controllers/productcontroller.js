const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Product = require ("../models/productModel");

// to get single product
module.exports.get_singleProduct = async (req, res) => {
    const _id = req.params.id;
  
    const product = await Product.findById(_id);
    if (product) {
      return res.status(201).json(product);
    } else {
      res.status(401).json({ message: "error in getting product" });
    }
  };
  
  //  Delete product
  module.exports.delete_product = (req, res) => {
    const _id = req.params.id;
  
    Product.findByIdAndDelete(_id)
      .then(() => {
        res.status(200).json({ message: "product deleted" });
      })
      .catch(() => {
        res.status(400).json({ message: "error product not deleted" });
      });
  };
  

  // to add new product
  module.exports.add_new_Product = async (req,res) =>{
    let { product_name,product_description, product_quantity,product_price } = req.body;
  const Product = await product.create
    
    const product = Product.create({
      product_name,
      product_description,
      product_quantity,
      product_price
  })
    };