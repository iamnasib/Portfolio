const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env.local") });
const express = require("express");
const connectDB = require("./db");

const startServer = async () => {
  try {
    await connectDB();
    const app = express();
    const port = process.env.PORT || 5000;
    app.use(express.json());

    app.use("/api/auth", require("./routes/auth"));
    app.use("/api/skill", require("./routes/skill"));
    app.use("/api/project", require("./routes/project"));

    app.listen(port, () => {
      console.log(`Portfolio backend Server is running on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
