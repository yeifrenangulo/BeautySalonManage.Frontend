import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Collaborator } from '@app/models/collaborator';
import { ResponseServer } from '@app/models/response-server';
import { CollaboratorService } from '@app/services/collaborator.service';
import { NotificationService } from '@app/services/notification.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { map } from 'rxjs';
import { DialogDeleteComponent } from '../../components/dialog-delete/dialog-delete.component';
import { DialogDetailComponent } from '../../components/dialog-detail/dialog-detail.component';

@Component({
  selector: 'app-collaborator-list',
  templateUrl: './collaborator-list.component.html',
  styleUrls: ['./collaborator-list.component.scss']
})
export class CollaboratorListComponent implements OnInit {
  pageNumber: number = 1;
  pageTotal: number;
  pageSize: number;
  name: string = '';
  surname: string = '';
  collaborators: Collaborator[] = [];
  loading = false;
  ref: DynamicDialogRef;

  constructor(
    private service: CollaboratorService, 
    public dialogService: DialogService,
    private notifier: NotificationService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.getCollaborators();
  }

  getCollaborators():void {
    this.service.getAll(`pageNumber=${this.pageNumber}`)
    .subscribe({
      next: (response) => {
        if (response.succeded) {
          this.collaborators = response.data;
          this.pageNumber = response.pageNumber;
          this.pageTotal = response.pageTotal;
          this.pageSize = response.pageSize;
        }

        this.loading = false;
      },
      error: error => {
        this.loading = false
        this.notifier.triggerToast();
        throw new HttpErrorResponse(error);
      }
    });
  }

  changePage(event: any): void {
    this.pageNumber = event.page + 1;
    this.getCollaborators();
  }

  showModalDetail(collaborator: Collaborator): void {
    this.ref = this.dialogService.open(DialogDetailComponent, {
      header: 'Información del colaborador',
      data: collaborator,
      styleClass: 'header-detail',
      width: '45%',
      contentStyle: {"max-height": "700px"},
      baseZIndex: 10000
    });
  }

  showModalDelete(collaborator: Collaborator): void {
    this.ref = this.dialogService.open(DialogDeleteComponent, {
      header: 'Confirmar eliminación',
      data: collaborator,
      styleClass: 'header-delete',
      width: '45%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((isDeleted: boolean) =>{
      if (isDeleted) {
        this.getCollaborators();
      }
    });
  }
}
