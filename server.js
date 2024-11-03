const mongoose = require("mongoose");
const dotenv = require("dotenv");



dotenv.config({ path: "./config.env" });
const path = process.env.PORT;

const connectDB = async () => {
  const database = process.env.DATABASE;
  await mongoose.connect(database, {})
    .then((connection) => {
      console.log("DB connection successful");
    }).catch((error) => {
      console.log("DB connection failed");
    });
};

const app = require("./app");

app.listen(3000, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${path}`);
});
