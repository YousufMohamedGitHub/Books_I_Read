var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Genres = require('./Models/genre');
var Books = require('./Models/book');


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'Client')));

//Connect to Mongoose
mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;



app.get('/api/genres',function(req, res){
Genres.getGenres(function(err, genres){
    if (err)
    {
        throw err;
    }
    res.json(genres);
});
});

app.post('/api/genres',function(req, res){
    var genre = req.body;
    Genres.AddGenres(genre ,function(err, genre){
        if (err)
        {
            throw err;
        }
        res.json(genre);
    });
    });

    app.put('/api/genres/:_id',function(req, res){
        var id = req.params._id;
        var genre = req.body;
        Genres.UpdateGenre(id,genre, {} ,function(err, genre){
            if (err)
            {
                throw err;
            }
            res.json(genre);
        });
        });

    app.delete('/api/genres/:_id',function(req, res){
            var id = req.params._id;
            Genres.DeleteGenre(id, function(err, genre){
                if (err)
                {
                    throw err;
                }
                res.json(genre);
            });
            });

app.get('/api/books',function(req, res){
    Books.getBooks(function(err, books){
        if (err)
        {
            throw err;
        }
        res.json(books);
    });
    });

    app.get('/api/books/:_id',function(req, res){
        Books.getBookByID(req.params._id,function(err, books){
            if (err)
            {
                throw err;
            }
            res.json(books);
        });
        });

    app.post('/api/books',function(req, res){
            var book = req.body;
            Books.AddBook(book ,function(err, book){
                if (err)
                {
                    throw err;
                }
                res.json(book);
            });
            });

    app.put('/api/books/:_id',function(req, res){
                var id = req.params._id;
                var book = req.body;
                Books.UpdateBook(id,book, {} ,function(err, book){
                    if (err)
                    {
                        throw err;
                    }
                    res.json(book);
                });
                });
    app.delete('/api/books/:_id',function(req, res){
                    var id = req.params._id;
                    Books.DeleteBook(id, function(err, genre){
                        if (err)
                        {
                            throw err;
                        }
                        res.json(genre);
                    });
                    });

app.listen(3000);
console.log('Running on Port 3000')