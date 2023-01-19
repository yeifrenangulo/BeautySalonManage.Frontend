import { Component } from '@angular/core';
import { Customer } from '@app/models/customer';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-dialog-detail',
  templateUrl: './dialog-detail.component.html',
  styleUrls: ['./dialog-detail.component.scss']
})
export class DialogDetailComponent {
  customer: Customer;

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    this.customer = config.data;
  }

  closeModal(): void {
    this.ref.close();
  }
}
