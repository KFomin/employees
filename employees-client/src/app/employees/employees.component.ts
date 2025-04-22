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
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employeesService: EmployeesService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.employeesService.employees$.subscribe((employees) => {
      this.employees = employees;
    });
    this.employeesService.loadEmployees();
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

  deleteEmployee(employee: Employee): void {
    if (confirm(`Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`)) {
      this.employeesService.deleteEmployee(employee._id).subscribe(() => {
        this.employeesService.loadEmployees();
      }, error => {
        console.error('Failed to remove employee:', error);
      });
    }
  }
}
