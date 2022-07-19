var express = require('express');
var router = express.Router();
module.exports = router;
const sequenceGenerator = require('./sequenceGenerator');
const expense = require('../models/expense');

router.get('/', (req, res, next) => {
  expense.find()
    .populate('group')
    .then((expenses) => {
      req.status(200).json({
        message: 'Expenses fetched successfully!',
        expenses: expenses,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'An error has occured',
        error: error,
      });
    });
});


router.post('/', (req, res, next) => {

  const maxExpensesId = sequenceGenerator.nextId('expenses');

  const expense = new Expense({
    id: 1,
    amount: request.body.amount,
    description: request.body.description,
    category: request.body.category
  });

  console.log(expense);

  expense.save()
    .then(createdExpense => {
      res.setHeader('Content-Type', 'application/json');
      res.status(201).json({
        message: 'Expense added successfully',
        expense: createdExpense
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occured',
        error: error
      });
    });
});

router.put('/:id', (req, res, next) => {
  expense.findOne({
      id: req.params.id
    }).then(expense => {
      expense.amount = req.body.amount;
      expense.description = req.body.description;
      expense.category = req.body.category;

      expense.updateOne({
          id: req.params.id
        }, expense).then(result => {
          res.status(204).json({
            message: 'Expense updated successfully'
          })
        })
        .catch(error => {
          res.status(500).json({
            message: 'An error occured',
            error: error
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Expense not found',
        error: {
          expense: 'Expense not found'
        }
      });
    });
});

router.delete('/:id', (req, res, next) => {
  expense.findOne({
      id: req.params.id
    }).then(document => {
      expense.deleteOne({
          id: req,
          res,
          next
        }).then(result => {
          res.status(204).json({
            message: 'Expense deleted successfully'
          });
        })
        .catch(error => {
          res.status(500).json({
            message: 'An error occured',
            error: error
          });
        })
    })
    .catch(error => {
      res.status(500).json({
        message: 'Expense not found',
        error: {
          expense: 'Expense not found'
        }
      });
    });
});
