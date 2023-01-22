import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Collaborator } from '@app/models/collaborator';
import { ResponseServer } from '@app/models/response-server';
import { User } from '@app/models/user';
import { environment } from '@environments/environment';
import { Observable, map } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {
  userName: string;

  constructor(private http: HttpClient, private auth: AuthenticationService) {
    this.userName = this.auth.userValue.userName;
  }

  getAll(parameters: any): Observable<ResponseServer> {
    return this.http.get<ResponseServer>(`${environment.apiUrl}/collaborators?${parameters}`)
      .pipe(map(res => { return res; })
    );
  }

  getById(id: number): Observable<Collaborator> {
    return this.http.get<Collaborator>(`${environment.apiUrl}/collaborators/${id}`)
    .pipe(map(res => {
      return res['data'];
    }));
  }

  newCollaborator(data: any): Observable<number> {
    let collaborator = { userName: this.userName };
    Object.assign(collaborator, data);

    return this.http.post<number>(`${environment.apiUrl}/collaborators`, collaborator)
      .pipe(map(data => {
        return data['data'];
      }));
  }

  editCollaborator(id: number, data: any): Observable<number> {
    let collaborator = { collaboratorId: id, userName: this.userName };
    Object.assign(collaborator, data);

    return this.http.put<number>(`${environment.apiUrl}/collaborators/${id}`, collaborator)
      .pipe(map(data => {
        return data['data'];
      }));
  }

  deleteCollaborator(id: number): Observable<number> {
    return this.http.delete<number>(`${environment.apiUrl}/collaborators/${id}`)
    .pipe(map(data => {
      return data['data'];
    }));
  }
}
