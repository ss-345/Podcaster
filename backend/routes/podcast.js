const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");
const Category = require("../model/category");
const Podcast = require("../model/podcast");
const User = require("../model/user");
const router = express.Router();

// add podcast
router.post("/add-podcast", authMiddleware, upload, async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const frontImage = req.files["frontImage"][0].path;
    const audioFile = req.files["audioFile"][0].path;
    if (!title || !description || !category || !frontImage || !audioFile) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = req.user;
    const cat = await Category.findOne({ categoryName: category });
    if (!cat) {
      return res.status(400).json({ message: "No such category found" });
    }
    const catId = cat._id;
    const userId = user._id;

    const newPodcast = new Podcast({
      frontImage,
      audioFile,
      title,
      description,
      category: catId,
      user: userId,
    });
    await newPodcast.save();
    await Category.findByIdAndUpdate(catId, {
      $push: { podcasts: newPodcast._id },
    });
    await User.findByIdAndUpdate(userId, {
      $push: { podcasts: newPodcast._id },
    });
    res.status(201).json({
      message: "Podcast added succesfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to add podcast", error });
  }
});
// all podcast
router.get("/get-podcasts", async (req, res) => {
  try {
    const podcasts = await Podcast.find()
      .populate("category")
      .sort({ createdAt: -1 });
    res.status(200).json({
      data: podcasts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});
// get user podcasts

router.get("/get-user-podcasts", authMiddleware, async (req, res) => {
  try {
    const { user } = req;
    const userId = user._id;
    const data = await User.findById(userId)
      .populate({
        path: "podcasts",
        populate: { path: "category" },
      })
      .select("-password");
    if (data && data.podcasts) {
      data.podcasts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    return res.status(200).json({ data: data.podcasts });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error !" });
  }
});
// individual podcast

router.get("/get-podcast/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const podcasts = await Podcast.findById(id).populate("category");
    return res.status(200).json({ data: podcasts });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error !" });
  }
});

// get podcast by category
router.get("/category/:cat", async (req, res) => {
  try {
    const { cat } = req.params;

    const categories = await Category.findOne({ categoryName: cat }).populate({
      path: "podcasts",
      populate: { path: "category" },
    });
    // console.log(categories);
    // console.log(categories.podcasts);
    return res.status(200).json({ data: categories.podcasts });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error !" });
  }
});
module.exports = router;
