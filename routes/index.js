var express = require('express');
var router = express.Router();

// mongoose is a API wrapper overtop of mongodb, just like
// .ADO.Net is a wrapper over raw SQL server interface
const mongoose = require("mongoose");

const Chips = require("../Chips");

// edited to include my non-admin, user level account and PW on mongo atlas
// and also to include the name of the mongo DB that the collection
const dbURI =
  "Enter connection string here";

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

const options = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10
};

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

/* GET all Chips */
router.get('/Chips', function (req, res) {
  // find {  takes values, but leaving it blank gets all}
  Chips.find({}, (err, AllChips) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    res.status(200).json(AllChips);
  });
});

/* post a new Chip and push to Mongo */
router.post('/NewChip', function (req, res) {

  let oneNewChip = new Chips(req.body);  // call constuctor in Chips code that makes a new mongo chip object
  console.log(req.body);
  oneNewChip.save((err, chip) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      console.log(chip);
      res.status(201).json(chip);
    }
  });
});

router.delete('/DeleteChip/:id', function (req, res) {
  Chips.deleteOne({ _id: req.params.id }, (err, note) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).json({ message: "Chip successfully deleted" });
  });
});

router.put('/UpdateChip/:id', function (req, res) {
  Chips.findOneAndUpdate(
    { _id: req.params.id },
    { name: req.body.name, flavor: req.body.flavor, brand: req.body.brand, eaten: req.body.eaten },
    { new: true },
    (err, chip) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(chip);
    })
})

/* GET one Chip */
router.get('/FindChip/:id', function (req, res) {
  console.log(req.params.id);
  Chips.find({ _id: req.params.id }, (err, oneChip) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    res.status(200).json(oneChip);
  });
});

module.exports = router;
