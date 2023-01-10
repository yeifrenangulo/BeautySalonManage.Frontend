import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { CustomerComponent } from './pages/customers/customer.component';
import {LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './shared/menu/menu.component';

import { NotificationService } from './services/notification.service';
import { GlobalErrorHandler } from './helpers/global-error.handler';
import { ServerErrorInterceptor } from './helpers/server-error.interceptor';
import { CustomerService } from './services/customer.service';
import { FormatStringPipe } from './pipes/format-string.pipe';
import { FormatDatePipe } from './pipes/format-string.pipe';
import { CustomerNewComponent } from './pages/customers/customer-new/customer-new.component';
import { CustomerListComponent } from './pages/customers/customer-list/customer-list.component';

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    HomeComponent,
    LoginComponent,
    MenuComponent,
    FormatStringPipe,
    FormatDatePipe,
    CustomerNewComponent,
    CustomerListComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,
  ],
  providers: [
    CustomerService,
    NotificationService,
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
