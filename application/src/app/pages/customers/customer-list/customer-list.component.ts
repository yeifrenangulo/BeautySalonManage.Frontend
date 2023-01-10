import { Component } from '@angular/core';
import { Customer } from '@app/models/customer';
import { ResponseServer } from '@app/models/response-server';
import { CustomerService } from '@app/services/customer.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent {
  pageNumber: number = 1;
  pageTotal: number;
  name: string = '';
  surname: string = '';
  response: ResponseServer;
  customers: Customer[];

  constructor(private service: CustomerService) { }

  ngOnInit(): void {
    this.getCustomers();
  }
  
  getCustomers():void {
    let parameters = `name=${this.name}&surname=${this.surname}&pageNumber=${this.pageNumber}`;

    this.service.getAll(parameters).pipe(map(res => {
      if (res.succeded) {
        this.customers = res.data;
        this.pageNumber = res.pageNumber;
        this.pageTotal = res.pageTotal;
      }

      return res;
    }))
    .subscribe();
  }

  changePage(number: number): void {
    this.pageNumber = number;
    this.getCustomers();
  }
}
