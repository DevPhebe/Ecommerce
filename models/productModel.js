const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    productname: {
      type: String,
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    productdescription: {
      type: String,
      required: true,
    },
    productquantity: {
      type: Number,
      default: 0
    },
    productprice: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("product", productSchema);
module.exports = Product;
