import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../models';


export interface EmployeeDTO {
  firstName: string;
  lastName: string;
  phoneNo: string;
  birthdate: string;
  officeId: string;
  tags: string[];
}


@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private endpoint = '/employees';
  employees$: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([]);

  constructor(private appService: AppService) {
  }

  loadEmployees(search?: string) {
    this.appService.get<Employee[]>(this.endpoint, search).subscribe((employees) => {
      this.employees$.next(employees);
    });
  }

  createEmployee(employeeData: EmployeeDTO): Observable<Employee> {
    return this.appService.post<Employee>(this.endpoint, employeeData);
  }

  deleteEmployee(id: string): Observable<void> {
    return this.appService.delete<void>(`${this.endpoint}/${id}`);
  }

  updateEmployee(id: string, employeeData: EmployeeDTO): Observable<Employee> {
    return this.appService.put<Employee>(`${this.endpoint}/${id}`, employeeData);
  }
}
