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
      return error.error['Message'];
    }
}