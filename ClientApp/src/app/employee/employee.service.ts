import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { EmpModel } from './empModel';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiURL = "https://localhost:44370/api";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<EmpModel[]> {
    return this.httpClient.get<EmpModel[]>(this.apiURL + '/Emp')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  create(post): Observable<EmpModel> {
    return this.httpClient.post<EmpModel>(this.apiURL + '/Emp/', JSON.stringify(post), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  find(id): Observable<EmpModel> {
    return this.httpClient.get<EmpModel>(this.apiURL + '/Emp/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  update(id, post): Observable<EmpModel> {
    return this.httpClient.put<EmpModel>(this.apiURL + '/Emp/' + id, JSON.stringify(post), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(id) {
    return this.httpClient.delete<EmpModel>(this.apiURL + '/Emp/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }


  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
