var mongoose = require('mongoose');

//Genre Schema
var genreSchema = mongoose.Schema({
name: {
    type: String,
    required: true
},
create_date:{
    type: Date,
    default: Date.now
}
});
var Genre = mongoose.model('Genre', genreSchema);
module.exports = Genre;

module.exports.getGenres = function(callback, limit) {
    Genre.find(callback).limit(limit);
};

//Add genre
module.exports.AddGenres = function(genre, callback) {
    Genre.create(genre, callback);
};

//Update Gnere
module.exports.UpdateGenre = function(id, genre, options, callback) {
    var query = {
        _id: id
    };
    var update = {
        name: genre.name
    }
    Genre.findOneAndUpdate(query, update, options, callback);
};

//Delete genre
module.exports.DeleteGenre = function(id, callback) {
    var query = {
        _id: id
    };
    Genre.remove(query, callback);
};

