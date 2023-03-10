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

      if (error.status === 400) {
        try {
          if (error.error['Errors']) {
            for (let err of error.error['Errors']) {
              notifier.showWarning(err, 5000);
            }
          }
          else if (error.error['errors']) {
            notifier.showWarning(error.error['title'], 5000);
          }
          else {
            message = errorService.getServerMessage(error);
            notifier.showWarning(message, 5000);
          }
        }
        catch(e) {
          notifier.showError('Hubo un error interno, comuniquese con el administrador', 5000);
        }
      }
      else if (error.status === 404) {
        if (error.error['Errors']) {
          for (let err of error.error['Errors']) {
            notifier.showInfo(err, 5000);
          }
        }
        else if (error.error['errors']) {
          notifier.showInfo(error.error['title'], 5000);
        }
        else {
          message = errorService.getServerMessage(error);
          notifier.showInfo(message, 5000);
        }
      }
      else {
        message = errorService.getServerMessage(error);
        notifier.showError(message, 5000);
      }
    } 
    else {
      // Client Error
      message = errorService.getClientMessage(error);
      stackTrace = errorService.getClientStack(error);
      notifier.showError(message, 5000);
    }

    console.error(error);
  }
}