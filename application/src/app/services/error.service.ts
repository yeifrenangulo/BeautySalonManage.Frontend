import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    getClientMessage(error: Error): string {
      return error.message ? error.message : error.toString();
    }

    getClientStack(error: Error): string {
      return error.stack;
    }

    getServerMessage(error: HttpErrorResponse): string {
      if (error.error['Message']) {
        return error.error['Message'];
      }
      else {
        if (error.status == 0) {
          return 'Recurso no encontrado, comuniquese con el administrador';
        }
        
        return error.statusText;
      }
    }
}