const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env.local") });
const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const isAuthorized = require("../middleware/isAuthorized");

router.post("/add", isAuthorized, async (req, res) => {
  try {
    const { name, url, description } = req.body;

    const project = new Project({ name, url, description });
    await project.save();
    return res.status(200).json({ msg: "Skill added", project });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});
router.get("/getProjects", isAuthorized, async (req, res) => {
  try {
    const projects = await Project.find();

    return res.status(200).json({ projects });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

router.delete("/delete/:id", isAuthorized, async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: "Skill not found" });
    }
    project = await Project.findByIdAndDelete(req.params.id);
    res.json({ project });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

module.exports = router;
