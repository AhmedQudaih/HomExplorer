const express = require("express");
const mongoose = require('mongoose');
const db = require('./db');
const cors = require("cors");
const app = express();
const port = 4000;
app.use(cors());
app.use("/" , require("./Routes/estateRoutes"));


app.listen(port, ()=>{
  console.log(`app listening at http://localhost:${port}`);
})
