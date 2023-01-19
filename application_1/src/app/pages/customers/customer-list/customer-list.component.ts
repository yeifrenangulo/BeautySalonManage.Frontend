import { HttpErrorResponse } from '@angular/common/http';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { Router } from '@angular/router';
import { Customer } from '@app/models/customer';
import { ResponseServer } from '@app/models/response-server';
import { CustomerService } from '@app/services/customer.service';
import { NotificationService } from '@app/services/notification.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { map } from 'rxjs';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent {
  @ViewChild('dataEmpty', { static: true }) dataEmpty!: TemplateRef<any>;

  pageNumber: number = 1;
  pageTotal: number;
  pageSize: number;
  name: string = '';
  surname: string = '';
  response: ResponseServer;
  customer: Customer;
  customers: Customer[];
  modalRef?: BsModalRef;
  loading = false;

  isVisible = false;
  isConfirmLoading = false;

  constructor(
    private service: CustomerService, 
    private modalService: BsModalService,
    private notifier: NotificationService,
    private readonly nzConfigService: NzConfigService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.nzConfigService.set('empty', { nzDefaultEmptyContent: this.dataEmpty });
    this.getCustomers();
  }

  showModal2(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);
  }

  handleCancel(): void {
    this.isVisible = false;
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

      console.log(res);
      return res;
    }))
    .subscribe(() => this.loading = false);
  }

  showModal(template: TemplateRef<any>, id: number): void {
    this.customer = this.customers[id];
    this.isVisible = true;
    // this.modalRef = this.modalService.show(
    //   template,
    //   Object.assign({}, { class: 'modal-dialog-centered modal-lg' })
    // );
  }

  changePage(number: number): void {
    this.pageNumber = number;
    this.getCustomers();
  }

  deleteCustomer(id: number) {
    this.service.deleteCustomer(id)
      .subscribe({
        next: () => {
          this.modalRef.hide();
          this.notifier.showSuccess('Cliente eliminado exitosamente', 5000, true);
          this.getCustomers();
        },
        error: error => {
          throw new HttpErrorResponse(error);
        }
      });
  }
}
