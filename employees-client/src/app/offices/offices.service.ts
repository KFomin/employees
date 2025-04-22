import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Office } from '../models';

export interface OfficeDTO {
  name: string;
  city: string;
}

@Injectable({
  providedIn: 'root',
})
export class OfficesService {
  private endpoint = '/offices';
  offices$: BehaviorSubject<Office[]> = new BehaviorSubject<Office[]>([]);

  constructor(private appService: AppService) {
  }

  loadOffices() {
    this.appService.get<Office[]>(this.endpoint).subscribe((offices: Office[]) => {
      this.offices$.next(offices);
    });
  }

  createOffice(officeData: OfficeDTO): Observable<Office> {
    return this.appService.post<Office>(this.endpoint, officeData);
  }

  updateOffice(id: string, officeData: OfficeDTO): Observable<Office> {
    return this.appService.put<Office>(`${this.endpoint}/${id}`, officeData);
  }

  deleteOffice(id: string): Observable<void> {
    return this.appService.delete<void>(`${this.endpoint}/${id}`);
  }
}
