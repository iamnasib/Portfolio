const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env.local") });
const express = require("express");
const router = express.Router();
const Skill = require("../models/Skill");
const isAuthorized = require("../middleware/isAuthorized");

router.post("/add", isAuthorized, async (req, res) => {
  try {
    const name = req.body.name;

    const skill = new Skill({ name });
    await skill.save();
    return res.status(200).json({ msg: "Skill added" });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});
router.get("/getSkills", isAuthorized, async (req, res) => {
  try {
    const skills = await Skill.find();

    return res.status(200).json({ skills });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

router.delete("/delete/:id", isAuthorized, async (req, res) => {
  try {
    let skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ msg: "Skill not found" });
    }
    skill = await Skill.findByIdAndDelete(req.params.id);
    res.json({ skill });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

module.exports = router;
