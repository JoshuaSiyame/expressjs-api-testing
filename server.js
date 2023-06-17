// import modules/packages
const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const logger = require("morgan");

// import routes
const appRoutes = require("./routes/routes");

// dot env configuration
dotenv.config();

// connection to database
mongoose.set("strictQuery", true);
if(process.env.MODE === "development"){
    console.log(`Server on port: ${process.env.PORT}`);
    mongoose.connect(process.env.MONGODB_URI_DEV).then(()=>{
        console.log("Connected to database successfully");
    }).catch((err)=>{
        console.error("Failed to connect to database", err);
    });
}else{
    console.log("No production mode");
};

// app instance
const app = express();

// app configurations
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// route configuration
app.use("/", appRoutes);

// server instance
const server = http.createServer(app);

server.listen(process.env.PORT, ()=>{
    console.log(`server on port: ${process.env.PORT}`);
});