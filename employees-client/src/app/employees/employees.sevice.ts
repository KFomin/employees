import {Injectable} from '@angular/core';
import {AppService} from '../app.service';
import {Observable} from 'rxjs';
import {Employee} from '../models';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private endpoint = '/employees';

  constructor(private appService: AppService) {
  }

  getEmployees(): Observable<Employee[]> {
    return this.appService.get<Employee[]>(this.endpoint);
  }
}
