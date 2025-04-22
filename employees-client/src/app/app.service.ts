import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private apiBaseUrl = 'http://localhost:3000';
  route$: BehaviorSubject<string> = new BehaviorSubject('');
  searchTerm$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private http: HttpClient, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.route$.next(event.url.split('/')[1]);
        this.searchTerm$.next('');
      }
    });
  }

  get<T>(url: string, search?: string): Observable<T> {
    return this.http.get<T>(`${this.apiBaseUrl}${url}${search ? `?search=${search}` : ''}`, {});
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.apiBaseUrl}${url}`, body);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${this.apiBaseUrl}${url}`);
  }

  put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.apiBaseUrl}${url}`, body);
  }
}
