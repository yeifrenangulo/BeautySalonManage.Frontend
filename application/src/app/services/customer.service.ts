import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseServer } from '@app/models/response-server';
import { environment } from '@environments/environment';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getAll(parameters: any): Observable<ResponseServer> {
    return this.http.get<ResponseServer>(`${environment.apiUrl}/customers?${parameters}`);
  }
}
