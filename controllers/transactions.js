const Transaction = require('../models/Transaction')

module.exports = {
  all: function(req, res) {
    Transaction.find(function (err, transactions) {
      if (err) {
        return res.status(500).send({err: err})
      }
      res.status(200).send(transactions)
    })
  },
  create: function(req, res) {
    var transaction = new Transaction({
      memberid: req.body.memberid,
      days: Number(req.body.days),
      price: Number(req.body.price)
    });
    transaction.booklist.push(req.params.bookId)
    transaction.save(function (err, result) {
      if (err) {
        return res.status(500).send({err: err})
      } else {
        res.status(200).send(result)
      }
    });
  },
  update: function(req, res) {
    let updateData = {}
    if (req.body.memberid) {updateData.memberid = req.body.memberid}
    if (req.body.days) {updateData.days = Number(req.body.days)}
    if (req.body.price) {updateData.price = Number(req.body.price)}
    Transaction.update({ _id: req.params.id }, {
      $set: updateData
    }, function(err, result) {
      if (err) {
        return res.status(500).send({err: err})
      }
      res.status(200).send(result)
    });
  },
  delete: function(req, res) {
    Transaction.remove({ _id: req.params.id }, function (err, result) {
      if (err) {
        return res.status(500).send({err: err})
      }
      res.status(200).send(result)
    })
  }
}
