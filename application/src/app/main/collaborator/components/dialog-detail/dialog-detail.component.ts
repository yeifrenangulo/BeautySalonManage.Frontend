import { Component } from '@angular/core';
import { Collaborator } from '@app/models/collaborator';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-dialog-detail',
  templateUrl: './dialog-detail.component.html',
  styleUrls: ['./dialog-detail.component.scss']
})
export class DialogDetailComponent {
  collaborator: Collaborator;

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    this.collaborator = config.data;
  }

  closeModal(): void {
    this.ref.close();
  }
}
