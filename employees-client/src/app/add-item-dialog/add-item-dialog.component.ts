import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
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
export class AddItemDialogComponent implements OnInit {
  itemData: any = {};
  offices: Office[] = [];
  tags: Tag[] = [];
  selectedTags: Tag[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { type: string, action: 'add' | 'edit', entity: any },
    private officesService: OfficesService,
    private tagsService: TagsService,
    private employeesService: EmployeesService,
  ) {
    this.loadOffices();
    this.loadTags();
  }

  ngOnInit() {
    if (this.data.entity) {
      this.itemData = { ...this.data.entity };

      if (this.itemData.birthdate) {
        this.itemData.birthdate = new Date(this.itemData.birthdate);
      }

      this.itemData.officeId = this.data.entity.officeId._id;

      if (this.data.entity.tags) {
        this.selectedTags = this.data.entity.tags.map((tag: Tag) => ({
          _id: tag._id,
          name: tag.name,
        }));
      }
    }
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
    if (!this.selectedTags.some(selectedTag => selectedTag._id === tag._id)) {
      this.selectedTags.push(tag);
    } else {
      this.selectedTags = this.selectedTags.filter(selectedTag => selectedTag._id !== tag._id);
    }
    console.log(this.selectedTags);
  }

  onAddClicked(): void {
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

  onApplyClicked() {
    const employeeData = this.getDialogData();

    this.employeesService.updateEmployee(this.data.entity._id, employeeData).subscribe(
      (response) => {
        console.log('Employee updated successfully:', response);
        this.dialogRef.close(response);
      },
      (error) => {
        console.error('Error while updating employee:', error);
      },
    );
  }

  getDialogData() {
    const tagMap = new Map(this.selectedTags.map(tag => [tag._id, tag]));
    const uniqueTags = [...tagMap.values()];
    console.log(this.selectedTags);
    return {
      ...this.itemData,
      birthdate: this.itemData.birthdate ? this.itemData.birthdate.toISOString() : null,
      tags: uniqueTags.map(tag => tag._id),
    };
  }

  isTagSelected(tag: Tag) {
    return this.selectedTags.some(selectedTag => selectedTag._id === tag._id);
  }
}
