import { Component, OnInit } from '@angular/core';
import { Office } from '../models';
import { OfficesService } from './offices.service';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
} from '@angular/material/table';
import { AddItemDialogComponent } from '../add-item-dialog/add-item-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { AppService } from '../app.service';

@Component({
  selector: 'app-offices',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatRow,
    MatHeaderRow,
    MatButton,
    SearchBarComponent,
  ],
  templateUrl: './offices.component.html',
  styleUrl: './offices.component.scss',
})
export class OfficesComponent implements OnInit {
  offices: Office[] = [];

  constructor(private officesService: OfficesService,
              private dialog: MatDialog,
              private app: AppService) {
  }

  ngOnInit(): void {
    this.officesService.offices$.subscribe(offices => {
      this.offices = offices;
    });
    this.officesService.loadOffices();
  }


  openEditDialog(office: Office): void {
    const dialogRef =
      this.dialog.open(AddItemDialogComponent, {
        data: {
          type: 'offices',
          action: 'edit',
          entity: office || {},
        },
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.app.showMessage('Office successfully updated');
        this.officesService.loadOffices();
      }
    });
  }


  addOffice(): void {
    const dialogRef = this.dialog.open(AddItemDialogComponent,
      {
        data: {
          type: 'offices',
          action: 'add',
        },
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.app.showMessage('Office successfully created');
        this.officesService.loadOffices();
      }
    });
  }


  deleteOffice(id: string): void {
    if (confirm('Are you sure you want to delete this office?')) {
      this.officesService.deleteOffice(id).subscribe({
        next: () => {
          this.officesService.loadOffices();
        },
        error: (error) => {
          console.log(error);
          this.app.showMessage(
            `Error deleting office ${error.error.message ? error.error.message : ''}`,
            'Close',
            5000,
          );
        },
      });
    }
  }

  performSearch(searchTerm: string) {
    this.app.searchTerm$.next(searchTerm);
  }
}
