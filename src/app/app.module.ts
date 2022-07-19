import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { ExpensesListComponent } from './expenses/expenses-list/expenses-list.component';
import { ExpensesItemComponent } from './expenses/expenses-item/expenses-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExpensesEditComponent } from './expenses/expenses-edit/expenses-edit.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    ExpensesComponent,
    ExpensesListComponent,
    ExpensesItemComponent,
    ExpensesEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [ExpensesComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
