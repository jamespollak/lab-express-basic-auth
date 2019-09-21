const mongoose = require("mongoose");
const User = require("../models/User");
const data = require("./data");

mongoose
    .connect("mongodb://localhost/basic-auth", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(connection => {
        console.log("Successfully Connected!");
        return User.deleteMany();
    })
    .then(() => {
        return User.insertMany(data);
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch(err => {
        console.log(err);
    });