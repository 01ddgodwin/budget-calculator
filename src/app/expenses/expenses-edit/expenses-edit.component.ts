import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ExpensesItemComponent } from '../expenses-item/expenses-item.component';
import { Expenses } from '../expenses.model';
import { ExpensesService } from '../expenses.service';

@Component({
  selector: 'app-expenses-edit',
  templateUrl: './expenses-edit.component.html',
  styleUrls: ['./expenses-edit.component.scss']
})
export class ExpensesEditComponent implements OnInit {
  @Input() expense!: Expenses;

  constructor(private expensesItemComponent: ExpensesItemComponent, private expenseService: ExpensesService) { }

  ngOnInit(): void {
  }

  onUpdate(form: NgForm) {
    const value = form.value;
    const newExpense = new Expenses(
      '1',
      value.amount,
      value.description,
      value.category
    );

    this.expenseService.updateExpense(this.expense, newExpense);
    console.log(newExpense)
    this.onCancel();
  }

  onCancel() {
    this.expensesItemComponent.display = false;
  }

}
