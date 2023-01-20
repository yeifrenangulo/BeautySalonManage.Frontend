import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Task } from '@app/models/service';
import { NotificationService } from '@app/services/notification.service';
import { TaskService } from '@app/services/task.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.scss']
})
export class DialogDeleteComponent {
  task: Task;

  constructor(
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig,
    private notifier: NotificationService,
    private service: TaskService
  ) {
    this.task = config.data;
  }

  deleteTask(id: number) {
    this.service.deleteService(id)
      .subscribe({
        next: () => {
          this.notifier.showSuccess('Servicio eliminado exitosamente', 5000);
          this.ref.close(true);
        },
        error: error => {
          throw new HttpErrorResponse(error);
        }
      });
  }

  closeModal(): void {
    this.ref.close();
  }
}
