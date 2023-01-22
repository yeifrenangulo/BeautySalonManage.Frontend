import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollaboratorRoutingModule } from './collaborator-routing.module';
import { CollaboratorNewComponent } from './pages/collaborator-new/collaborator-new.component';
import { CollaboratorListComponent } from './pages/collaborator-list/collaborator-list.component';
import { DialogDetailComponent } from './components/dialog-detail/dialog-detail.component';
import { DialogDeleteComponent } from './components/dialog-delete/dialog-delete.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DesignComponentsModule } from '@app/design-components/design-components.module';
import { SharedModule } from '@app/shared/shared.module';
import { DialogService } from 'primeng/dynamicdialog';


@NgModule({
  declarations: [
    CollaboratorNewComponent,
    CollaboratorListComponent,
    DialogDetailComponent,
    DialogDeleteComponent
  ],
  imports: [
    CommonModule,
    CollaboratorRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    DesignComponentsModule
  ],
  providers: [
    DialogService
  ]
})
export class CollaboratorModule { }
