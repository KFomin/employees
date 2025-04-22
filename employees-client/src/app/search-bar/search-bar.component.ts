import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatIconButton } from '@angular/material/button';
import { AppService } from '../app.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  imports: [
    MatFormField,
    FormsModule,
    MatInput,
    MatLabel,
    MatIconButton,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent implements OnInit {
  constructor(private app: AppService) {
  }

  searchTerm: string = '';
  title: string = '';

  @Output() search = new EventEmitter<string>();

  ngOnInit() {
    this.app.route$.subscribe(route => {
      this.title = route;
      this.searchTerm = '';
    });
  }

  onSearch() {
    delay(1000)
    this.search.emit(this.searchTerm);
  }
}
