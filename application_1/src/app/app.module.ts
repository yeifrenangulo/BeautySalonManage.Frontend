//Modules
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { PluginsModule } from './plugins/plugins.module';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

//Components
import { AppComponent } from './app.component';
import { CustomerComponent } from './pages/customers/customer.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './shared/menu/menu.component';
import { CustomerNewComponent } from './pages/customers/customer-new/customer-new.component';
import { CustomerListComponent } from './pages/customers/customer-list/customer-list.component';

//Services
import { CustomerService } from './services/customer.service';
import { NotificationService } from './services/notification.service';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { GlobalErrorHandler } from './helpers/global-error.handler';
import { ServerErrorInterceptor } from './helpers/server-error.interceptor';

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    LoginComponent,
    CustomerComponent,
    CustomerNewComponent,
    CustomerListComponent,
  ],
  imports: [
    FormsModule,
    PluginsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    CustomerService,
    NotificationService,
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
