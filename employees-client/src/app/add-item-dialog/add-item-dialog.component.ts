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
import { AppService } from '../app.service';
import { Observable } from 'rxjs';

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
    @Inject(MAT_DIALOG_DATA) public data: {
      type: 'employees' | 'offices' | 'tags',
      action: 'add' | 'edit',
      entity: any
    },
    private officesService: OfficesService,
    private tagsService: TagsService,
    private employeesService: EmployeesService,
    private app: AppService,
  ) {
  }

  ngOnInit() {
    this.tagsService.tags$.subscribe((tags: Tag[]) => {
      this.tags = tags;
    });

    this.officesService.offices$.subscribe((offices: Office[]) => {
      this.offices = offices;
    });

    if (this.data.entity) {
      this.itemData = { ...this.data.entity };

      if (this.itemData.birthdate) {
        this.itemData.birthdate = new Date(this.itemData.birthdate);
      }

      if (this.itemData.officeId) {
        this.itemData.officeId = this.data.entity.officeId._id;
      }

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

  onTagSelect(tag: Tag): void {
    if (!this.selectedTags.some(selectedTag => selectedTag._id === tag._id)) {
      this.selectedTags.push(tag);
    } else {
      this.selectedTags = this.selectedTags.filter(selectedTag => selectedTag._id !== tag._id);
    }
    console.log(this.selectedTags);
  }

  onAddClicked(): void {
    this.doAddRequest(this.data.type).subscribe(
      {
        next: (response) => {
          this.dialogRef.close(response);
        },
        error: (error) => {
          this.app.showMessage(
            `Error while adding employee: ${error.error?.message ? error.error.message : ''}`,
            'Close',
            5000,
          );
        },
      },
    );
  }

  doAddRequest(type: 'offices' | 'employees' | 'tags'): Observable<any> {
    const dialogData = this.getDialogData();
    switch (type) {
      case 'offices':
        return this.officesService.createOffice(dialogData);
      case 'tags':
        return this.tagsService.createTag(dialogData);
      case 'employees':
        return this.employeesService.createEmployee(dialogData);
    }
  }

  onApplyClicked(): void {
    this.doUpdateRequest(this.data.type).subscribe(
      {
        next: (response) => {
          this.app.showMessage('Updated successfully');
          this.dialogRef.close(response);
        },
        error: (error) => {
          this.app.showMessage(
            `Error while updating : ${error.error?.message ? error.error.message : ''}`,
            'Close',
            5000,
          );
        },
      },
    );
  }

  doUpdateRequest(type: 'offices' | 'employees' | 'tags'): Observable<any> {
    const entityData = this.getDialogData();
    switch (type) {
      case 'employees':
        return this.employeesService.updateEmployee(this.data.entity._id, entityData);
      case 'tags':
        return this.tagsService.updateTag(this.data.entity._id, entityData);
      case 'offices':
        return this.officesService.updateOffice(this.data.entity._id, entityData);
    }
  }

  getDialogData() {
    switch (this.data.type) {
      case 'employees':
        const tagMap = new Map(this.selectedTags.map(tag => [tag._id, tag]));
        const uniqueTags = [...tagMap.values()];
        return {
          ...this.itemData,
          birthdate: this.itemData.birthdate ? this.itemData.birthdate.toISOString() : null,
          tags: uniqueTags.map(tag => tag._id),
        };
      case 'tags':
        return {
          ...this.itemData,
        };
      case 'offices':
        return {
          ...this.itemData,
        };
      default:
        break;
    }
  }

  isTagSelected(tag: Tag) {
    return this.selectedTags.some(selectedTag => selectedTag._id === tag._id);
  }
}
