import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/helpers/auth.guard';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { CustomerNewComponent } from './pages/customer-new/customer-new.component';

const routes: Routes = [
  { 
    path: '',
    children: [
      { path: 'list', component: CustomerListComponent, canActivate: [AuthGuard] },
      { path: 'new', component: CustomerNewComponent, canActivate: [AuthGuard] },
      { path: 'edit/:id', component: CustomerNewComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'list', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
