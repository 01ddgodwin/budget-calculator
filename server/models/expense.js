
const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema({
   id: { type: String },
   amount: { type: String, required: true },
   description: { type: String },
   category: { type: String, required: true }
});

module.exports = mongoose.model('Expense', expenseSchema);