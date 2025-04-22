import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { AddItemDialogComponent } from '../add-item-dialog/add-item-dialog.component';
import { EmployeesService } from '../employees/employees.sevice';
import { OfficesService } from '../offices/offices.service';
import { TagsService } from '../tags/tags.service';

@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbar,
    MatButton,
    RouterLink,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private dialog: MatDialog,
              private router: Router,
              private employees: EmployeesService,
              private offices: OfficesService,
              private tags: TagsService,
  ) {
  }

  openAddDialog(): void {
    const currentRoute = this.router.url.split('/')[1];

    const dialogRef = this.dialog.open(AddItemDialogComponent, {
      data: { type: currentRoute, action: 'add' },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        switch (currentRoute) {
          case 'employees':
            this.employees.loadEmployees();
            break;
          case 'tags':
            this.tags.loadTags();
            break;
          case 'offices':
            this.offices.loadOffices();
            break;
          default:
            break;
        }
      }

    });
  }
}
