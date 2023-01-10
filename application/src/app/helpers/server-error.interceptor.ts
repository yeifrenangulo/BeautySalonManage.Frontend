import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

// import { AuthenticationService } from '@app/_services';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  // constructor(private authenticationService: AuthenticationService) { }
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((err: HttpErrorResponse) => {
      if ([401, 403].indexOf(err.status) !== -1) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        // this.authenticationService.logout();
      }
      
      // const error = new Error(err.error.Message || err.statusText);

      return throwError(() => err);
    }));
  }
}