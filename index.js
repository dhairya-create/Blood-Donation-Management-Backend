require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DataBase Connected...");
  })
  .catch((err) => {
    console.log(err);
});

app.get("/",(req,res)=>{
  res.send("hello world");
})

const supervisor = require('./routes/supervisor');
app.use('/supervisor',supervisor);

const user = require('./routes/user');
app.use('/user',user);

const wallet = require('./routes/wallet');
app.use('/wallet',wallet);

const bloodBottle = require('./routes/bloodBottle');
app.use('/bloodBottle',bloodBottle);

const programDrives = require('./routes/programDrives');
app.use('/drive',programDrives);

const prerequesites = require('./routes/prerequesites');
app.use('/prerequesites',prerequesites);

const transaction = require('./routes/transaction');
app.use('/transaction',transaction);

const address = require('./routes/address');
app.use('/address',address);

app.listen(port,()=>{
    console.log(`Server is running on port:${port}`);
});