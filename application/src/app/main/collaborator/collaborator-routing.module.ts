import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/helpers/auth.guard';
import { CollaboratorListComponent } from './pages/collaborator-list/collaborator-list.component';
import { CollaboratorNewComponent } from './pages/collaborator-new/collaborator-new.component';

const routes: Routes = [
  { 
    path: '',
    children: [
      { path: 'list', component: CollaboratorListComponent, canActivate: [AuthGuard] },
      { path: 'new', component: CollaboratorNewComponent, canActivate: [AuthGuard] },
      { path: 'edit/:id', component: CollaboratorNewComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'list', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollaboratorRoutingModule { }
