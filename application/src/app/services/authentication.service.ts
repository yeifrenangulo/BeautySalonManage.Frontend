import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/models/user';
import { environment } from '@environments/environment';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  
  constructor(private router: Router, private http: HttpClient) { 
    this.userSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(user: string, password: string) {
    return this.http.post<User>(`${environment.apiUrlLogin}/authenticate`, { user, password })
      .pipe(map(user => {
        sessionStorage.setItem('user', JSON.stringify(user['data']));
        this.userSubject.next(user['data']);
        return user['data'];
      }));
  }

  logout() {
    sessionStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
}
