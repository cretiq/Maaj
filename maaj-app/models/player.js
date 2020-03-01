const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playerShema = new Schema({
    nickname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    points: [
        {
            type: String,
            required: true
        }
    ],
});

module.exports = mongoose.model('Player', playerShema);
