const mongoose = require("mongoose");
// const mongoURI =
//   "mongodb://localhost:27017/portfolio?tls=false&directConnection=true";

const mongoURI =
  "mongodb+srv://nasibfarooq123:Ahanger732@cluster0.srt5e.mongodb.net/portfolioDatabase?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("DB connected..!");
  } catch (err) {
    console.log(err, "nn");
  }
};

module.exports = connectDB;
