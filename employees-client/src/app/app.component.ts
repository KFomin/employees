import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { OfficesService } from './offices/offices.service';
import { TagsService } from './tags/tags.service';
import { EmployeesService } from './employees/employees.sevice';
import { AppService } from './app.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    private offices: OfficesService,
    private employees: EmployeesService,
    private tags: TagsService,
    private router: Router,
    private app: AppService) {
  }

  ngOnInit() {
    this.offices.loadOffices();
    this.tags.loadTags();

    this.app.searchTerm$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(searchTerm => {

      const currentRoute = this.router.url.split('/')[1];

      switch (currentRoute) {
        case 'employees':
          this.employees.loadEmployees(searchTerm);
          break;
        case 'tags':
          this.tags.loadTags(searchTerm);
          break;
        case 'offices':
          this.offices.loadOffices(searchTerm);
          break;
        default:
          break;
      }

    });
  }
}
