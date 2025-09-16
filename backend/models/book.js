const mongoose = require('mongoose');

const Bookschema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    status: String,
    pagesTotal:Number,
    pagesRead:Number,
    rating:String,
    notes:String,
    coverURL:String
});

module.exports = mongoose.model('Book', Bookschema, 'book');