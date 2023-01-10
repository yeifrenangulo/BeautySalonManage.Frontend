import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { 
    alertify.set('notifier','position', 'top-right');
  }

  showSuccess(message: String, time = 5) {
    alertify.success(message, time);
  }

  showWarning(message: String, time = 0) {
    alertify.warning(message, time);
  }

  showError(message: String, time = 0) {
    alertify.error(message, time);
  }

  showInfo(message: String, time = 5) {
    alertify.message(message, time);
  }
}
