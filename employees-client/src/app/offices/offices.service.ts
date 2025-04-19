import {Injectable} from '@angular/core';
import {AppService} from '../app.service';
import {Observable} from 'rxjs';
import {Office} from '../models';


@Injectable({
  providedIn: 'root'
})
export class OfficesService {
  private endpoint = '/offices';

  constructor(private appService: AppService) {
  }

  getOffices(): Observable<Office[]> {
    return this.appService.get<Office[]>(this.endpoint);
  }
}
