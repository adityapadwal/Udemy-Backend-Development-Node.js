const express = require('express');
const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// dotenv.config();

const app = express();

const dbUrl = "mongodb+srv://aditya:aditya@cluster0.sq1hr4c.mongodb.net/tempData?retryWrites=true&w=majority";

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(dbUrl, connectionParams)
.then(() => {
    console.log('DB connection successful!');
})
.catch((err) => {
    console.log(err);
});

app.listen(8800, () => {
    console.log('Backend server is running!');
});

