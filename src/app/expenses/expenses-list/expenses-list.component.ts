import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Expenses } from '../expenses.model';
import { ExpensesService } from '../expenses.service';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss']
})
export class ExpensesListComponent implements OnInit {
  expenses: Expenses[] = [];
  subscripton!: Subscription;

  constructor(private expensesService: ExpensesService) { 
    // this.expensesService.getExpenses();
  }

  ngOnInit() {

    // this.expensesService.getExpenses();
    this.expensesService.expensesChangedEvent.subscribe((expenses: Expenses[]) => {
      this.expenses = expenses;
    })

  }

  ngOnDestroy(): void {
    this.subscripton.unsubscribe();
  }

}
