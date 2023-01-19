import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'login', 
    loadChildren: () => import('./main/login/login.module').then(m => m.LoginModule), 
  },
  {
    path: 'customers',
    loadChildren: () => import('./main/customers/customers.module').then(m => m.CustomersModule),
  },
  { 
    path: 'home', 
    loadChildren: () => import('./main/home/home.module').then(m => m.HomeModule),
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
