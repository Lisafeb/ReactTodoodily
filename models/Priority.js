
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PrioritySchema = new Schema({
    priority : {
        priorityIds : [String]
    }
});

module.exports = mongoose.model('priority', PrioritySchema);