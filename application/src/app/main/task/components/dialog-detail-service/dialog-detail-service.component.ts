import { Component } from '@angular/core';
import { Task } from '@app/models/service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-dialog-detail-service',
  templateUrl: './dialog-detail-service.component.html',
  styleUrls: ['./dialog-detail-service.component.scss']
})
export class DialogDetailServiceComponent {
  task: Task;

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    this.task = config.data;
  }

  closeModal(): void {
    this.ref.close();
  }
}
