import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Customer } from '@app/models/customer';
import { CustomerService } from '@app/services/customer.service';
import { NotificationService } from '@app/services/notification.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.scss']
})
export class DialogDeleteComponent {
  customer: Customer;

  constructor(
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig,
    private notifier: NotificationService,
    private service: CustomerService
  ) {
    this.customer = config.data;
  }

  deleteCustomer(id: number) {
    this.service.deleteCustomer(id)
      .subscribe({
        next: () => {
          this.notifier.showSuccess('Cliente eliminado exitosamente', 5000);
          this.ref.close(true);
        },
        error: error => {
          throw new HttpErrorResponse(error);
        }
      });
  }

  closeModal(): void {
    this.ref.close();
  }
}
