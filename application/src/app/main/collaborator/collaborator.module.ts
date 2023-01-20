import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollaboratorRoutingModule } from './collaborator-routing.module';
import { CollaboratorNewComponent } from './pages/collaborator-new/collaborator-new.component';
import { CollaboratorListComponent } from './pages/collaborator-list/collaborator-list.component';
import { DialogDetailComponent } from './components/dialog-detail/dialog-detail.component';
import { DialogDeleteComponent } from './components/dialog-delete/dialog-delete.component';


@NgModule({
  declarations: [
    CollaboratorNewComponent,
    CollaboratorListComponent,
    DialogDetailComponent,
    DialogDeleteComponent
  ],
  imports: [
    CommonModule,
    CollaboratorRoutingModule
  ]
})
export class CollaboratorModule { }
