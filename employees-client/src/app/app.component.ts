import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { OfficesService } from './offices/offices.service';
import { TagsService } from './tags/tags.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    private offices: OfficesService,
    private tags: TagsService) {
  }

  ngOnInit() {
    this.offices.loadOffices();
    this.tags.loadTags();
  }
}
