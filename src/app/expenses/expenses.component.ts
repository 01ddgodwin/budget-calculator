import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { identifierName } from '@angular/compiler';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Expenses } from './expenses.model';
import { totalAmount } from './totalAmount.model';
import { ExpensesService } from './expenses.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
  @ViewChild('amount') amountInputRef!: ElementRef;
  @ViewChild('description') descriptionInputRef!: ElementRef;
  @ViewChild('category') categoryInputRef!: ElementRef;

  originalExpenses!: Expenses;
  totalAmount!: totalAmount[];
  expenses!: Expenses;
  editMode: boolean = false;

  amountIncome: number = 0;
  amountVal = Number(this.amountIncome);
  incomeSum: number = 0;

  incomeTotal = document.getElementById('incomeTotal')

  constructor(
    private expensesService: ExpensesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (id === undefined || id === null) {
        this.editMode = false;
        return;
      }

      this.originalExpenses = this.expensesService.getExpense(id)!;

      if (this.originalExpenses === undefined || this.originalExpenses === null) {
        return;
      }

      this.editMode = true;
      this.expenses = JSON.parse(JSON.stringify(this.originalExpenses))

    });

  }

  // onSubmit(form: NgForm) {
  //   console.log(form)
  //   const value = form.value;
  //   const newExpenses = new Expenses(
  //     this.expensesService.maxExpenseId.toString(),
  //     value.amount,
  //     value.description,
  //     value.category
  //   );
  //   if (this.editMode) {
  //     this.expensesService.updateExpense(this.originalExpenses, newExpenses);
  //   } else {
  //     this.expensesService.addExpense(newExpenses);
  //   }
  //   this.onCancel();
  // }

  onCancel() {
    this.router.navigate(['/expenses'])
  }

  onSendExpense() {
    const expenseAmount = this.amountInputRef.nativeElement.value;
    const expenseDescription = this.descriptionInputRef.nativeElement.value;
    const expenseCategory = this.categoryInputRef.nativeElement.value;

    const newExpense = new Expenses(
      '',
      expenseAmount,
      expenseDescription,
      expenseCategory
    );

    const newTotalAmount = new totalAmount(
      '',
      expenseAmount
    );

      if (expenseAmount && expenseCategory) {
        this.expensesService.addExpense(newExpense);
        this.expensesService.addTotalAmount(newTotalAmount);

        console.log(newExpense);
        console.log(newTotalAmount);
        
        this.incomeSum += Number(expenseAmount);
        if (this.incomeSum < 0) {
          
        }

        this.onClear();
      }
  }



  onClear() {
    this.amountInputRef.nativeElement.value = '';
    this.descriptionInputRef.nativeElement.value = '';
    this.categoryInputRef.nativeElement.value = '';
  }

  

}
