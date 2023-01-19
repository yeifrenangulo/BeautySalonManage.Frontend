import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomerNewComponent } from './pages/customer-new/customer-new.component';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DesignComponentsModule } from '@app/design-components/design-components.module';
import { SharedModule } from '@app/shared/shared.module';
import { DialogDetailComponent } from './components/dialog-detail/dialog-detail.component';
import { DialogDeleteComponent } from './components/dialog-delete/dialog-delete.component';
import { DialogService } from 'primeng/dynamicdialog';


@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerNewComponent,
    DialogDetailComponent,
    DialogDeleteComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    CustomersRoutingModule,
    DesignComponentsModule
  ],
  providers: [
    DialogService
  ]
})
export class CustomersModule { }
