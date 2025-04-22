import { Component, OnInit } from '@angular/core';
import { EmployeesService } from './employees.sevice';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { Employee } from '../models';
import { MatButton } from '@angular/material/button';
import { AddItemDialogComponent } from '../add-item-dialog/add-item-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe, NgClass, NgForOf } from '@angular/common';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { AppService } from '../app.service';

@Component({
  selector: 'app-employees',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatCellDef,
    MatHeaderCellDef,
    MatButton,
    NgForOf,
    DatePipe,
    NgClass,
    SearchBarComponent,
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  expandedEmployee: Employee | null = null;

  columnsToDisplay = ['firstname', 'lastname', 'officeId', 'actions'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];


  constructor(private employeesService: EmployeesService,
              private dialog: MatDialog,
              private app: AppService,
  ) {
  }

  ngOnInit(): void {
    this.employeesService.employees$.subscribe((employees) => {
      this.employees = employees;
    });
    this.employeesService.loadEmployees();
  }

  toggleRow(employee: Employee): void {
    this.expandedEmployee = this.expandedEmployee?._id === employee._id ? null : employee;
  }

  editEmployee(employee: Employee): void {
    const dialogRef = this.dialog.open(AddItemDialogComponent,
      {
        data: {
          type: 'employees',
          action: 'edit',
          entity: employee,
        },
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeesService.loadEmployees();
      }
    });
  }

  addEmployee(): void {
    const dialogRef = this.dialog.open(AddItemDialogComponent,
      {
        data: {
          type: 'employees',
          action: 'add',
        },
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeesService.loadEmployees();
      }
    });
  }


  deleteEmployee(employee: Employee): void {
    if (confirm(`Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`)) {
      this.employeesService.deleteEmployee(employee._id).subscribe(() => {
        this.employeesService.loadEmployees();
      }, error => {
        console.error('Failed to remove employee:', error);
      });
    }
  }

  performSearch(searchTerm: string) {
    this.app.searchTerm$.next(searchTerm);
  }

}
