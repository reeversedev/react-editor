const express = require("express");
const router = express.Router();

const Document = require("./model");

router.get("/document/:id", (req, res) => {
  Document.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.json(doc);
    }
  });
});

router.post("/document", (req, res) => {
  console.log("check");
  const newDocument = new Document({
    name: req.body.name,
    date: req.body.date,
    data: req.body.data
  });
  newDocument.save((err, response) => {
    if (!err) {
      res.json(response);
    }
  });
});

router.put("/document/:id", (req, res) => {
  Document.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.json(req.body);
    }
  );
});

module.exports = router;
