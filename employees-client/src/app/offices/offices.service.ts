import {Injectable} from '@angular/core';
import {AppService} from '../app.service'; // Импортируем основной сервис
import {Observable} from 'rxjs';
import {Office} from '../models';


@Injectable({
  providedIn: 'root'
})
export class OfficesService {
  private endpoint = '/offices'; // Эндпоинт для офисов

  constructor(private appService: AppService) {
  }

  getOffices(): Observable<Office[]> {
    return this.appService.get<Office[]>(this.endpoint);
  }
}
