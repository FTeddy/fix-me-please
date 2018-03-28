const Book = require('../models/Book.js')

module.exports = {
  all: function(req, res) {
    Book.find(function (err, books) {
      if (err) {
        res.status(500).send({err: err})
      }
      res.status(200).send(books)
    })
  },
  create: function(req, res) {
    console.log(req.body);
    var book = new Book({
      isbn: req.body.isbn,
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
      stock: Number(req.body.stock),
    });
    book.save(function (err, result) {
      if (err) {
        res.status(500).send({err: err})
      }
      res.status(200).send(result)
    });
  },
  update: function(req, res) {
    let updataData = {}
    if (req.body.isbn) {updateData.isbn = req.body.isbn}
    if (req.body.title) {updateData.title = req.body.title}
    if (req.body.author) {updateData.author = req.body.author}
    if (req.body.category) {updateData.category = req.body.category}
    if (req.body.stock) {updateData.stock = Number(req.body.stock)}

    Book.update({ _id: req.id }, {
      $set: req.body
    }, function(err, result) {
      if (err) {
        res.status(500).send({err: err})
      }
      res.status(200).send(result)
    });
  },
  delete: function(req, res) {
    Book.remove({ _id: req.id }, function (err, result) {
      if (err) {
        res.status(500).send({err: err})
      }
      res.status(200).send(result)
    });
  }
}
