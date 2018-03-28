const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var mongoose = require('mongoose');
let url = 'mongodb://werkbau:YratyortSevaC5691@devstack-0-shard-00-00-hjaoe.mongodb.net:27017,devstack-0-shard-00-01-hjaoe.mongodb.net:27017,devstack-0-shard-00-02-hjaoe.mongodb.net:27017/fixMe?ssl=true&replicaSet=devstack-0-shard-0&authSource=admin'
let localhost = 'mongodb://localhost/api-crud-mongoose'
mongoose.connect(url, (err) => {
  err ? console.log('Can\'t connect to database') : console.log('Database connected')
});

var books = require('./routes/books');
var transactions = require('./routes/transactions');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:false }))
app.use('/books', books);
app.use('/transactions', transactions);

app.listen(3000)
