
const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
   maxExpensesId: { type: Number, required: true },
});

module.exports = mongoose.model('Sequence', sequenceSchema);