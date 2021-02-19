var mongoose = require('mongoose');

//Genre Schema
var BookSchema = mongoose.Schema({
title: {
    type: String,
    required: true
},
genre:{

    type: String,
    required: true
},
description:{

    type: String,
    
},
author:{

    type: String,
    required: true
},
publisher:{

    type: String,
    
},
pages:{

    type: String,
    
},
img_url:{

    type: String,
    required: true
},
buy_url:{

    type: String,
    required: true
},
create_date:{
    type: Date,
    default: Date.now
}
});
var Book = mongoose.model('Book', BookSchema);
module.exports = Book;
//Get Books
module.exports.getBooks = function(callback, limit) {
    Book.find(callback).limit(limit);
};

//Get Book

module.exports.getBookByID = function(id,callback) {
    Book.findById(id,callback);
};

//Add Book
module.exports.AddBook = function(book, callback) {
    Book.create(book, callback);
};

//Update Book
module.exports.UpdateBook = function(id, book, options, callback) {
    var query = {
        _id: id
    };
    var update = {
        title: book.tilte,
        genre: book.genre,
        description: book.description,
        author: book.author,
        publisher: book.publisher,
        pages: book.pages,
        img_url: book.img_url,
        buy_url: book.buy_url

    }
    Book.findOneAndUpdate(query, update, options, callback);
};


//Delete genre
module.exports.DeleteBook = function(id, callback) {
    var query = {
        _id: id
    };
    Book.remove(query, callback);
};

