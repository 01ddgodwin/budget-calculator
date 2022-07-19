import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Expenses } from '../expenses.model';
import { ExpensesService } from '../expenses.service';
import { ExpensesComponent } from '../expenses.component';
import { totalAmount } from '../totalAmount.model';

@Component({
  selector: 'app-expenses-item',
  templateUrl: './expenses-item.component.html',
  styleUrls: ['./expenses-item.component.scss']
})
export class ExpensesItemComponent implements OnInit {
  @Input() expense!: Expenses;
  @Input() totalAmount!: totalAmount
  @Input() index!: number;

  @Output() editItem: EventEmitter<any> = new EventEmitter<any>()
  display = false;


  constructor(private expenseService: ExpensesService, private expensesComponent: ExpensesComponent) { }

  ngOnInit(): void {
  }

  onDeleteItem(expense: Expenses) {
    this.expenseService.deleteExpense(this.expense);
    this.expenseService.deleteAmount(this.totalAmount);
    this.expensesComponent.incomeSum -= Number(expense.amount);
  }

  onEditItem(expense: Expenses) {
    this.display = true;
  }

}
