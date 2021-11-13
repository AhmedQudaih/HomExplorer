const express = require("express");
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const multer = require('multer');
const db = require('./db');
const cors = require("cors");
const app = express();
const port = 4000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use("/" , require("./Routes/estateRoutes"));





app.listen(port, ()=>{
  console.log(`app listening at http://localhost:${port}`);
})
