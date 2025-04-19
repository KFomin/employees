import {Injectable} from '@angular/core';
import {AppService} from '../app.service';
import {Observable} from 'rxjs';
import {Tag} from '../models';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private endpoint = '/tags';

  constructor(private appService: AppService) {
  }

  getTags(): Observable<Tag[]> {
    return this.appService.get<Tag[]>(this.endpoint);
  }
}
