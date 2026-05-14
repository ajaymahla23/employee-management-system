import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { EmployeeListComponent } from './components/employee-list/employee-list';
import { EmployeeFormComponent } from './components/employee-form/employee-form';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Default page
  { path: 'list', component: EmployeeListComponent }, // List page
  { path: 'add', component: EmployeeFormComponent }, // Add page
];
