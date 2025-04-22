import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tag } from '../models';


export interface TagDTO {
  name: string;
  city: string;
}


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

  createTag(tagData: TagDTO): Observable<Tag> {
    return this.appService.post<Tag>(this.endpoint, tagData);
  }

  updateTag(id: string, tagData: TagDTO): Observable<Tag> {
    return this.appService.put<Tag>(`${this.endpoint}/${id}`, tagData);
  }

  deleteTag(id: string): Observable<void> {
    return this.appService.delete<void>(`${this.endpoint}/${id}`);
  }

}
