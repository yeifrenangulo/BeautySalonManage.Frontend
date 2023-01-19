import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showSuccess(message: string, time = 5000, progressBar = false) {
    this.toastr.success(message, '', {
      timeOut: time,
      progressBar: progressBar
    });
  }

  showWarning(message: string, time = 5000) {
    this.toastr.warning(message, '', {
      timeOut: time,
      progressBar: true,
      extendedTimeOut: 1000
    });
  }

  showError(message: string, time = 0) {
    this.toastr.error(message, '', {
      timeOut: time,
      progressBar: true,
      extendedTimeOut: 1000
    });
  }

  showInfo(message: string, time = 5000, progressBar = false) {
    this.toastr.info(message, '', {
      timeOut: time,
      progressBar: progressBar
    });
  }
}
