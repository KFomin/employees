import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgForOf, NgIf } from '@angular/common';
import { OfficesService } from '../offices/offices.service';
import { TagsService } from '../tags/tags.service';
import { Office, Tag } from '../models';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatCheckbox } from '@angular/material/checkbox';
import { EmployeesService } from '../employees/employees.sevice';

@Component({
  selector: 'app-add-item-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatInputModule,
    MatFormField,
    MatInput,
    FormsModule,
    NgIf,
    MatSelect,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatCheckbox,
    MatOption,
    NgForOf,
  ],
  templateUrl: './add-item-dialog.component.html',
  styleUrl: './add-item-dialog.component.scss',
})
export class AddItemDialogComponent {
  itemData: any = {};
  offices: Office[] = [];
  tags: Tag[] = [];
  selectedTags: Tag[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { type: string },
    private officesService: OfficesService,
    private tagsService: TagsService,
    private employeesService: EmployeesService,
  ) {
    this.loadOffices();
    this.loadTags();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  loadOffices(): void {
    this.officesService.getOffices().subscribe(offices => {
      this.offices = offices;
    });
  }

  loadTags(): void {
    this.tagsService.getTags().subscribe(tags => {
      this.tags = tags;
    });
  }

  onTagSelect(tag: Tag): void {
    if (!this.selectedTags.includes(tag)) {
      this.selectedTags.push(tag);
    } else {
      this.selectedTags = this.selectedTags.filter(t => t !== tag);
    }
  }

  addEmployee(): void {
    const employeeData = this.getDialogData();

    this.employeesService.createEmployee(employeeData).subscribe(
      (response) => {
        console.log('Employee added successfully:', response);
        this.dialogRef.close(response);
      },
      (error) => {
        console.error('Error while adding employee:', error);
      },
    );
  }

  getDialogData() {
    return {
      ...this.itemData,
      birthdate: this.itemData.birthdate ? this.itemData.birthdate.toISOString() : null,
      tags: this.selectedTags.map(tag => tag._id),
    };
  }
}
