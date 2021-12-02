const express = require('express');
const app = express();
const PORT = 4000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const url = require("./env").url;

app.use(bodyParser.json());
app.use(cors());


app.listen(PORT, () => console.log(`Server on at ${PORT}`)); 


//set up mongoose
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}).then( () => console.log("MongoDB connected, connected")).catch((err) => {console.log(err);});


app.use("/auth", require("./auth"))


// console.log("here");
