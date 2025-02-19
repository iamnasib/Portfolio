const mongoose = require("mongoose");
const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
