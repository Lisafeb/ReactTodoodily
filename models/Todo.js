const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now
    },
    checked: {
        type: Boolean,
        default: false
    },
   
});

module.exports = mongoose.model('todo', TodoSchema);