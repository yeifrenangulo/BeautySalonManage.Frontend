import { Component } from '@angular/core';
import { Customer } from '@app/models/customer';
import { ResponseServer } from '@app/models/response-server';
import { CustomerService } from '@app/services/customer.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { map } from 'rxjs';
import { DialogDeleteComponent } from '../../components/dialog-delete/dialog-delete.component';
import { DialogDetailComponent } from '../../components/dialog-detail/dialog-detail.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent {
  pageNumber: number = 1;
  pageTotal: number;
  pageSize: number;
  name: string = '';
  surname: string = '';
  response: ResponseServer;
  customers: Customer[] = [];
  loading = false;
  ref: DynamicDialogRef;

  constructor(private service: CustomerService, public dialogService: DialogService) { }

  ngOnInit(): void {
    this.loading = true;
    this.getCustomers();
  }

  getCustomers():void {
    let parameters = `name=${this.name}&surname=${this.surname}&pageNumber=${this.pageNumber}`;

    this.service.getAll(parameters).pipe(map(res => {
      if (res.succeded) {
        this.customers = res.data;
        this.pageNumber = res.pageNumber;
        this.pageTotal = res.pageTotal;
        this.pageSize = res.pageSize;
      }

      return res;
    }))
    .subscribe(() => this.loading = false);
  }

  changePage(event: any): void {
    this.pageNumber = event.page + 1;
    this.getCustomers();
  }

  showModalDetail(customer: Customer): void {
    this.ref = this.dialogService.open(DialogDetailComponent, {
      header: 'Información del cliente',
      data: customer,
      styleClass: 'header-detail',
      width: '45%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
    });
  }

  showModalDelete(customer: Customer): void {
    this.ref = this.dialogService.open(DialogDeleteComponent, {
      header: 'Confirmar eliminación',
      data: customer,
      styleClass: 'header-delete',
      width: '45%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((isDeleted: boolean) =>{
      if (isDeleted) {
        this.getCustomers();
      }
    });
  }
}
