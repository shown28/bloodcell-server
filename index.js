const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors")
const route = require("./routes/route")

const app = express();
const PORT = process.env.PORT;
const DATABASE = process.env.DBSTRING;

app.use(cors())
app.use(express.json());
  app.use('/uploads', express.static('uploads'));
app.use(route)

mongoose
  .connect(DATABASE)
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.listen(PORT, () => {
  console.log("app runnig on port ",PORT);
 
});
