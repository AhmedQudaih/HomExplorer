const express = require("express");
const path = require('path');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const multer = require('multer');
const db = require(path.join(__dirname +'/db'));
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'));
app.use("/" , require(path.join(__dirname +"/Routes/estateRoutes")));





app.listen(port, ()=>{
  console.log(`app listening at http://localhost:${port}`);
})
