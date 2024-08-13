const express = require("express");
const router = express.Router();
const Category = require("../model/category");
// add-category
router.post("/add-category", async (req, res) => {
  const { categoryName } = req.body;
  const existingCat = await Category.findOne({
    categoryName: categoryName,
  });
  if (existingCat) {
    return res.status(400).json({
      message: "Category already exist here",
    });
  }
  const cat = new Category({ categoryName });
  await cat.save();
  return res.status(200).json({
    message: `category ${categoryName} created succesfully`,
  });
});

module.exports = router;
