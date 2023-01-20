import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private messageService: MessageService) { }

  showSuccess(message: string, time = 5000, progressBar = false) {
    this.messageService.add({severity:'success', summary:'Exitoso', detail: message, life: time});
  }

  showWarning(message: string, time = 5000) {
    this.messageService.add({severity:'warn', summary:'Advertencia', detail: message, life: time});
  }

  showError(message: string, time = 5000) {
    this.messageService.add({severity:'error', summary:'Error', detail: message, life: time});
  }

  showInfo(message: string, time = 5000, progressBar = false) {
    this.messageService.add({severity:'info', summary:'Info', detail: message, life: time});
  }

  triggerToast() {
    this.messageService.add({severity:'custom', summary: '', detail: '', icon: ''});
  }
}
