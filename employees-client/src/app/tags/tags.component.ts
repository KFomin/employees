import {Component, OnInit} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {Tag} from '../models';
import {TagsService} from './tags.service';

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
    MatHeaderRow
  ],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss'
})
export class TagsComponent implements OnInit {
  tags: Tag[] = []; // Список тегов

  constructor(private tagsService: TagsService) {
  }

  ngOnInit(): void {
    this.loadTags(); // Загружаем данные тегов при инициализации компонента
  }

  loadTags(): void {
    this.tagsService.getTags().subscribe(
      (data) => {
        this.tags = data; // Сохраняем данные
      },
      (error) => {
        console.error('Ошибка при получении тегов:', error);
      }
    );
  }
}
