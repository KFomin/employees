import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tag } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  private endpoint = '/tags';
  tags$: BehaviorSubject<Tag[]> = new BehaviorSubject<Tag[]>([]);

  constructor(private appService: AppService) {
  }

  loadTags() {
    this.appService.get<Tag[]>(this.endpoint).subscribe((tags: Tag[]) => {
      this.tags$.next(tags);
    });
  }


}
