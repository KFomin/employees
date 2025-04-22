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
  ],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss',
})
export class TagsComponent implements OnInit {
  tags: Tag[] = [];

  constructor(
    private tagsService: TagsService,
    private dialog: MatDialog,
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
        this.tagsService.loadTags();
      }
    });
  }

  deleteTag(tag: Tag): void {
    if (confirm(`Are you sure you want to delete ${tag.name}?`)) {
      this.tagsService.deleteTag(tag._id).subscribe(() => {
        this.tagsService.loadTags();
      }, error => {
        console.error('Failed to remove tag:', error);
      });
    }
  }

}
