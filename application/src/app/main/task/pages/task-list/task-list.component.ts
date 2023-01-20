import { Component } from '@angular/core';
import { DialogDeleteComponent } from '@app/main/task/components/dialog-delete/dialog-delete.component';
import { ResponseServer } from '@app/models/response-server';
import { Task } from '@app/models/service';
import { TaskService } from '@app/services/task.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { map } from 'rxjs';
import { DialogDetailServiceComponent } from '../../components/dialog-detail-service/dialog-detail-service.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  pageNumber: number = 1;
  pageTotal: number;
  pageSize: number;
  tasks: Task[] = [];
  response: ResponseServer;
  loading = false;
  ref: DynamicDialogRef;
  
  constructor(private service: TaskService, public dialogService: DialogService) { }

  ngOnInit(): void {
    this.loading = true;
    this.getServices();
  }

  getServices():void {
    this.service.getAll(`pageNumber=${this.pageNumber}`).pipe(map(res => {
      if (res.succeded) {
        this.tasks = res.data;
        this.pageNumber = res.pageNumber;
        this.pageTotal = res.pageTotal;
        this.pageSize = res.pageSize;
      }

      return res;
    }))
    .subscribe(() => this.loading = false);
  }

  changePage(event: any): void {
    this.pageNumber = event.page + 1;
    this.getServices();
  }

  showModalDetail(task: Task): void {
    this.ref = this.dialogService.open(DialogDetailServiceComponent, {
      header: 'Información del servicio',
      data: task,
      styleClass: 'header-detail',
      width: '45%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
    });
  }

  showModalDelete(task: Task): void {
    this.ref = this.dialogService.open(DialogDeleteComponent, {
      header: 'Confirmar eliminación',
      data: task,
      styleClass: 'header-delete',
      width: '45%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((isDeleted: boolean) =>{
      if (isDeleted) {
        this.getServices();
      }
    });
  }
}
