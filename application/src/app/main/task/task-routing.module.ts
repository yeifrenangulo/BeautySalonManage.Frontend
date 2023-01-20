import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/helpers/auth.guard';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { TaskNewComponent } from './pages/task-new/task-new.component';

const routes: Routes = [
  { 
    path: '',
    children: [
      { path: 'list', component: TaskListComponent, canActivate: [AuthGuard] },
      { path: 'new', component: TaskNewComponent, canActivate: [AuthGuard] },
      { path: 'edit/:id', component: TaskNewComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'list', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
