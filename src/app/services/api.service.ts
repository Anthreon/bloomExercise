import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CustomerEventsDataStructure } from '../interfaces/customerEvents';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly API_URL =
    'https://br-fe-assignment.github.io/customer-events/events.json';

  constructor(private http: HttpClient) {}

  public getCustomerEvents(): Observable<CustomerEventsDataStructure> {
    return this.http
      .get<CustomerEventsDataStructure>(`${this.API_URL}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API call error:', error);
    return throwError(
      () => new Error('Something went wrong with the API call.')
    );
  }
}
