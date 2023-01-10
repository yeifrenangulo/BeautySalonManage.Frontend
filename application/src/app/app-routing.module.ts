import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { CustomerListComponent } from './pages/customers/customer-list/customer-list.component';
import { CustomerNewComponent } from './pages/customers/customer-new/customer-new.component';

import { CustomerComponent } from './pages/customers/customer.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'home', 
    component: HomeComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'customers',
    component: CustomerComponent,
    children: [
      {
        path: '', 
        component: CustomerListComponent, 
        canActivate: [AuthGuard]
      },
      { 
        path: ':id', 
        component: CustomerNewComponent, 
        canActivate: [AuthGuard]
      },
    ]
  },
  { 
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full' 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
