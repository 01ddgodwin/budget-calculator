import { Component, OnInit } from '@angular/core';
import { ExpensesComponent } from '../expenses/expenses.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public expensesComponent: ExpensesComponent) { }

  ngOnInit(): void {
  }

}
