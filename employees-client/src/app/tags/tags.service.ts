import {Injectable} from '@angular/core';
import {AppService} from '../app.service'; // Импортируем основной сервис
import {Observable} from 'rxjs';
import {Tag} from '../models';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private endpoint = '/tags'; // Эндпоинт для тегов

  constructor(private appService: AppService) {
  }

  getTags(): Observable<Tag[]> {
    return this.appService.get<Tag[]>(this.endpoint);
  }
}
