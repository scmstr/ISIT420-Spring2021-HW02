var express = require('express');
var router = express.Router();

// mongoose is a API wrapper overtop of mongodb, just like
// .ADO.Net is a wrapper over raw SQL server interface
const mongoose = require("mongoose");

const Orders = require("../Orders");

// edited to include my non-admin, user level account and PW on mongo atlas
// and also to include the name of the mongo DB that the collection
const dbURI =
"mongo connect here";


// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

const options = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10
};

var hourPurchTracker = -1;
var dayPurchTracker = 0;

mongoose.connect(dbURI, options).then(
  () => {
    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);

/* GET home page. */
router.get('/', function (req, res) {
  res.sendFile('index.html');
});

/* post a new Order with Hour and Day Purch values without pushing to MongoDB */
router.post('/HourDayPurch', function (req, res) {
  hourPurchTracker++;
  
  let newOrder = req.body;
  newOrder.hourPurch = hourPurchTracker;
  newOrder.dayPurch = dayPurchTracker;

  if (hourPurchTracker === 24){
    // Reset hour purch
    hourPurchTracker = 0;

    // Increment day purch
    dayPurchTracker++;

    // Set new hour and day purch values
    newOrder.hourPurch = hourPurchTracker;
    newOrder.dayPurch = dayPurchTracker;
  }
     
  console.log(newOrder);
  res.status(201).json(newOrder);
});

module.exports = router;
