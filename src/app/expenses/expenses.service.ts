import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { response } from 'express';
import { Subject } from 'rxjs';
import { Expenses } from './expenses.model';
import { totalAmount } from './totalAmount.model';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  expensesChangedEvent = new EventEmitter<Expenses[]>();
  totalAmountChangedEvent = new EventEmitter<totalAmount[]>();
  expenses: Expenses[] = [];
  totalAmount: totalAmount[] = [];
  maxExpenseId: number;
  expenseTotal!: number;

  constructor(private http: HttpClient) {
    this.expenses = [];
    this.maxExpenseId = this.getMaxId();
    // this.expenseTotal = this.getExpenseTotal();


    http.get<Expenses[]>('https://budget-calculator-3819b-default-rtdb.firebaseio.com/expenses.json')
    .subscribe(
      (expenses: Expenses[]) => {
        this.expenses = expenses;
        // this.maxExpenseId = this.getMaxId();
        if (!expenses) {
          return;
        } else {
          this.expensesChangedEvent.emit(this.expenses.slice());
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  // getExpenseTotal() {
  //   let expenseTotal = 0;

  //   this.expenseTotal = this.expenses.reduce((sum, item) => sum + this.expenses.amount, 0);

  //   console.log(expenseTotal);
    
  // }

  getMaxId(): number {
    let maxId = 0;

    for (let expense of this.expenses) {
      let currentId = +expense.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  getExpense(id: string) {
    return this.expenses.find((expense) => expense.id === id);
  }


  // Get all expenses from database
  // getExpenses() {
  //   this.
  // }

  
  // Store expense from input
  storeExpenses() {
    let expenses = JSON.stringify(this.expenses);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.put(
      'https://budget-calculator-3819b-default-rtdb.firebaseio.com/expenses.json',
      expenses,
      { headers: headers}
    )
    .subscribe(() => {
      this.expensesChangedEvent.emit(this.expenses.slice())
    })
  }

  // Send the expense to the database
  addExpense(newExpense: Expenses) {
    if (!newExpense) {
      return;
    }

    // newExpense.id = '';

    this.maxExpenseId++;
    let newId = +newExpense.id;
    this.expenses.push(newExpense);
    this.storeExpenses();
  }

  storeTotalAmount() {
    let totalAmount = JSON.stringify(this.totalAmount);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    
    this.http.put(
      'https://budget-calculator-3819b-default-rtdb.firebaseio.com/totalAmount.json',
      totalAmount,
      { headers: headers}
    )
    .subscribe(() => {
      this.totalAmountChangedEvent.emit(this.totalAmount.slice())
    })
  }

  addTotalAmount(newTotalAmount: totalAmount) {
    if (!newTotalAmount) {
      return;
    }

    this.totalAmount.push(newTotalAmount);
    this.storeTotalAmount();
  }

  // Update an expense in the database
  updateExpense(originalExpense: Expenses, newExpense: Expenses) {
    const index = this.expenses.indexOf(originalExpense);
    console.log(index);

    if (index < 0) {
      return;
    }

    newExpense.id = originalExpense.id;
    this.expenses[index] = newExpense;
    // const expensesListClone = this.expenses.slice();
    // this.expensesChangedEvent.emit(expensesListClone);
    this.storeExpenses();
  }

  // Delete an expense from the database
  deleteExpense(expense: Expenses) {
    if (!expense) {
      return;
    }

    const pos = this.expenses.indexOf(expense);
    if (pos < 0) {
      return;
    }

    this.expenses.splice(pos, 1);
    this.storeExpenses();
  }

  deleteAmount(totalAmount: totalAmount) {
    if (!totalAmount) {
      return;
    }

    const pos = this.totalAmount.indexOf(totalAmount);
    if (pos < 0) {
      return;
    }

    console.log(pos);

    this.totalAmount.splice(pos, 1);
    this.storeTotalAmount();
  }

}
