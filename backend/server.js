const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const DB_NAME = "tutorial"

// routes
var testAPIRouter = require("./routes/testAPI");
var UserRouter = require("./routes/Users");
var authRouter = require("./middle/auth");
var dashboardRouter = require("./routes/dashboard");
var profile = require("./routes/profile")
var decode = require("./routes/decode");
var ediprof = require("./routes/editprof")
var buyrouter = require("./routes/buyerdash");
var statsrouter = require("./routes/stats");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB
mongoose.connect('mongodb://mongodb/' + DB_NAME, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})

// setup API endpoints

app.use("/api/user", UserRouter);

app.use(authRouter)
app.use("/api/dashboard", dashboardRouter);
app.use("/api/decode", decode)
app.use("/api/testAPI", testAPIRouter);
app.use("/api/profile", profile);
app.use("/api/edit",ediprof);
app.use("/api/buyerdash",buyrouter);
app.use("/api/stats",statsrouter);


app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
