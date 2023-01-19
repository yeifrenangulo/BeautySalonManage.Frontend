import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ErrorService } from '@app/services/error.service';
import { NotificationService } from '@app/services/notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  // Error handling is important and needs to be loaded first.
  // Because of this we should manually inject the services with Injector.
  constructor(private injector: Injector) { }

  handleError(error: Error | HttpErrorResponse) {

    const errorService = this.injector.get(ErrorService);
    const notifier = this.injector.get(NotificationService);

    let message: string;
    let stackTrace: string;

    if (error instanceof HttpErrorResponse) {
      // Server Error

      if (error.status === 400 || error.status === 404) {
        if (error.error['Errors']) {
          for (let err of error.error['Errors']) {
            notifier.showWarning(err);
          }
        }
        else if (error.error['errors']) {
          notifier.showWarning(error.error['title']);
        }
        else {
          message = errorService.getServerMessage(error);
          notifier.showWarning(message);
        }
      }
      else {
        message = errorService.getServerMessage(error);
        notifier.showError(message);
      }
    } 
    else {
      // Client Error
      message = errorService.getClientMessage(error);
      stackTrace = errorService.getClientStack(error);
      notifier.showError(message);
    }

    console.error(error);
  }
}