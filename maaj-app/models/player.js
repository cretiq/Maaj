const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playerSchema = new Schema({
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
            type: Schema.Types.ObjectId,
            ref: 'Point'
        }
    ],
});

module.exports = mongoose.model('Player', playerSchema);
