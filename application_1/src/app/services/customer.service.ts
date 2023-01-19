import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseServer } from '@app/models/response-server';
import { environment } from '@environments/environment';

import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getAll(parameters: any): Observable<ResponseServer> {
    return this.http.get<ResponseServer>(`${environment.apiUrl}/customers?${parameters}`);
  }

  getById(id: number): Observable<ResponseServer> {
    return this.http.get<ResponseServer>(`${environment.apiUrl}/customers/${id}`);
  }

  newCustomer(data: any): Observable<number> {
    return this.http.post<number>(`${environment.apiUrl}/customers`, data)
      .pipe(map(data => {
        return data['data'];
      }));
  }

  editCustomer(id: number, data: any): Observable<number> {
    return this.http.put<number>(`${environment.apiUrl}/customers/${id}`, data)
      .pipe(map(data => {
        return data['data'];
      }));
  }

  deleteCustomer(id: number): Observable<number> {
    return this.http.delete<number>(`${environment.apiUrl}/customers/${id}`)
    .pipe(map(data => {
      return data['data'];
    }));
  }
}
