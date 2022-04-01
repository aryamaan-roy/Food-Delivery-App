const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 5000;
const DB_NAME = "tutorial"
const mongodb_uri = "mongodb+srv://aryamaan:abr28072002@cluster0.fze5r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"


// routes
var testAPIRouter = require("./routes/testAPI");
var UserRouter = require("./routes/Users");
var VenderRouter = require("./routes/Venders");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

DB =
  mongodb_uri;
mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB database connection established successfully !");
  })
  .catch((err) => {
    console.log("MongoDB database connection error !", err);
  });

// setup API endpoints
app.use("/testAPI", testAPIRouter);
app.use("/user", UserRouter);
app.use("/vender", VenderRouter);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

