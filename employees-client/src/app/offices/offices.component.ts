import {Component, OnInit} from '@angular/core';
import {Office} from '../models';
import {OfficesService} from './offices.service';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';

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
    MatHeaderRow
  ],
  templateUrl: './offices.component.html',
  styleUrl: './offices.component.scss'
})
export class OfficesComponent implements OnInit {
  offices: Office[] = [];

  constructor(private officesService: OfficesService) {
  }

  ngOnInit(): void {
    this.loadOffices();
  }

  loadOffices(): void {
    this.officesService.getOffices().subscribe(
      (data) => {
        this.offices = data;
      },
      (error) => {
        console.error('Failed to get offices:', error);
      }
    );
  }
}
