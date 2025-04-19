import { Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { OfficesComponent } from './offices/offices.component';
import { TagsComponent } from './tags/tags.component';

export const routes: Routes = [
  { path: 'employees', component: EmployeesComponent },
  { path: 'offices', component: OfficesComponent },
  { path: 'tags', component: TagsComponent },
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
];
