import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Collaborator } from '@app/models/collaborator';
import { CollaboratorService } from '@app/services/collaborator.service';
import { NotificationService } from '@app/services/notification.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.scss']
})
export class DialogDeleteComponent {
  collaborator: Collaborator;
  
  constructor(
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig,
    private notifier: NotificationService,
    private service: CollaboratorService
  ) {
    this.collaborator = config.data;
  }

  deleteCollaborator(id: number) {
    this.service.deleteCollaborator(id)
      .subscribe({
        next: () => {
          this.notifier.showSuccess('Colaborador eliminado exitosamente', 5000);
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
