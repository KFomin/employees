import { Component, OnInit } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
} from '@angular/material/table';
import { Tag } from '../models';
import { TagsService } from './tags.service';
import { MatButton } from '@angular/material/button';
import { AddItemDialogComponent } from '../add-item-dialog/add-item-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from '../app.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-tags',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatRow,
    MatHeaderRow,
    MatButton,
    SearchBarComponent,
  ],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss',
})
export class TagsComponent implements OnInit {
  tags: Tag[] = [];

  constructor(
    private tagsService: TagsService,
    private dialog: MatDialog,
    private app: AppService,
  ) {
  }

  ngOnInit(): void {
    this.tagsService.tags$.subscribe(tags => {
      this.tags = tags;
    });
    this.tagsService.loadTags();
  }


  editTag(tag: Tag): void {
    const dialogRef =
      this.dialog.open(AddItemDialogComponent,
        {
          data: {
            type: 'tags',
            action: 'edit',
            entity: tag,
          },
        });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.app.showMessage('Tag successfully updated');
        this.tagsService.loadTags();
      }
    });
  }


  addTag(): void {
    const dialogRef = this.dialog.open(AddItemDialogComponent,
      {
        data: {
          type: 'tags',
          action: 'add',
        },
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.app.showMessage('Tag successfully added');
        this.tagsService.loadTags();
      }
    });
  }


  deleteTag(tag: Tag): void {
    if (confirm(`Are you sure you want to delete ${tag.name}?`)) {
      this.tagsService.deleteTag(tag._id).subscribe(
        () => {
          this.tagsService.loadTags();
        },
        (error) => {
          this.app.showMessage(
            `Error deleting tag ${error.error.message ? (':' + error.error.message) : ''}`,
            'Close',
            5000,
          );
          ;
        });
    }
  }

  performSearch(searchTerm: string) {
    this.app.searchTerm$.next(searchTerm);
  }

}
