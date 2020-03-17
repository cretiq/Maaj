const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pointSchema = new Schema({
    date: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Point', pointSchema);
