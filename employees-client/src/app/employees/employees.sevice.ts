import {Injectable} from '@angular/core';
import {AppService} from '../app.service';
import {Observable} from 'rxjs';
import {Employee} from '../models';


export interface EmployeeDTO {
  firstName: string;
  lastName: string;
  phoneNo: string;
  birthdate: string;
  officeId: string;
  tags: string[];
}


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

  createEmployee(employeeData: EmployeeDTO): Observable<Employee> {
    return this.appService.post<Employee>(this.endpoint, employeeData);
  }
  deleteEmployee(id: string): Observable<void> {
    return this.appService.delete<void>(`${this.endpoint}/${id}`);
  }
}
