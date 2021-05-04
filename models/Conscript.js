const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ConscriptSchema = new Schema({
    name: {
        last: String,
        first: String,
    },
    rank: String,
    base: String,
    dateIn: Date,
    dateOut: Date
});

const Conscript = mongoose.model('Conscript', ConscriptSchema)
module.exports = Conscript