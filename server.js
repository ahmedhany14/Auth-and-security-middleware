const mongoose = require("mongoose");
const dotenv = require("dotenv");



dotenv.config({ path: "./Config.env" });

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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${port}`);
});
