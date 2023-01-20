import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseServer } from '@app/models/response-server';
import { environment } from '@environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getAll(parameters: any): Observable<ResponseServer> {
    return this.http.get<ResponseServer>(`${environment.apiUrl}/services?${parameters}`);
  }

  getById(id: number): Observable<ResponseServer> {
    return this.http.get<ResponseServer>(`${environment.apiUrl}/services/${id}`);
  }

  newService(data: any): Observable<number> {
    return this.http.post<number>(`${environment.apiUrl}/services`, data)
      .pipe(map(data => {
        return data['data'];
      }));
  }

  editService(id: number, data: any): Observable<number> {
    return this.http.put<number>(`${environment.apiUrl}/services/${id}`, data)
      .pipe(map(data => {
        return data['data'];
      }));
  }

  deleteService(id: number): Observable<number> {
    return this.http.delete<number>(`${environment.apiUrl}/services/${id}`)
    .pipe(map(data => {
      return data['data'];
    }));
  }
}
