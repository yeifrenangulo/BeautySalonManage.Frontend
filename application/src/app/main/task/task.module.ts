import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { TaskNewComponent } from './pages/task-new/task-new.component';
import { DesignComponentsModule } from '@app/design-components/design-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from '@app/shared/shared.module';
import { DialogDeleteComponent } from './components/dialog-delete/dialog-delete.component';
import { DialogDetailServiceComponent } from './components/dialog-detail-service/dialog-detail-service.component';


@NgModule({
  declarations: [
    TaskListComponent,
    TaskNewComponent,
    DialogDeleteComponent,
    DialogDetailServiceComponent
  ],
  imports: [
    CommonModule,
    DesignComponentsModule,
    ReactiveFormsModule,
    SharedModule,
    TaskRoutingModule
  ],
  providers: [
    DialogService
  ]
})
export class TaskModule { }
