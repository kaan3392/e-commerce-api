const router = require("express").Router();
const Product = require("../models/Product");
const { verifyTokenAndAdmin } = require("../verifyToken");

//create product

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedPro = await newProduct.save();
    res.status(200).json(savedPro);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update product

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete product

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a product

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("comments");
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all products
router.get("/", async (req, res) => {
  const { newPro } = req.query;
  const { category } = req.query;
  const { filter } = req.query;
  try {
    let products;
    if (newPro) {
      products = await Product.find()
        .sort({ createdAt: -1 })
        .limit(6)
        .populate("comments");
      
    } else if (category) {
      products = await Product.find({
        categories: {
          $in: [category],
        },
      }).populate("comments");
      
    } else if (filter) {
      products = await Product.find({ title: new RegExp(filter, "i") }).limit(
        5
      );
      
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
