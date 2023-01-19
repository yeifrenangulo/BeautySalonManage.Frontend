import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { esLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { CustomerService } from '@app/services/customer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '@app/services/notification.service';
import { map } from 'rxjs';
import { Customer } from '@app/models/customer';

@Component({
  selector: 'app-customer-new',
  templateUrl: './customer-new.component.html',
  styleUrls: ['./customer-new.component.css']
})
export class CustomerNewComponent implements OnInit {
  idCustomer: number;
  customer: Customer;
  customerForm: FormGroup;
  configDate: any;
  isCreated = false;
  loading = false;
  submitted = false;
  titlePage = "Nuevo";

  get nameInvalid() { return this.customerForm.get('name').invalid; }
  get surnameInvalid() { return this.customerForm.get('surname').invalid; }
  get phoneInvalid() { return this.customerForm.get('phone').invalid; }
  get genderInvalid() { return this.customerForm.get('gender').invalid; } 

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      phone: ['', Validators.required],
      dateBirth: null,
      gender: ['', Validators.required],
    });
  }

  constructor(
    private formBuilder: FormBuilder, 
    private activatedRoute: ActivatedRoute, 
    private service: CustomerService,
    private localeService: BsLocaleService,
    private notifier: NotificationService,
    private router: Router
  ) {

    defineLocale('es', esLocale);
    this.localeService.use('es');

    this.configDate = {
      adaptivePosition: true,
      isAnimated: true,
      dateInputFormat: 'MMMM - DD',
      containerClass: 'theme-orange',
      startView: 'month'
    };

    this.activatedRoute.params.subscribe(params => {
      this.idCustomer = params['id'];

      if (this.idCustomer == 0) {
        this.isCreated = true;
      }
      else {
        this.titlePage = "Editar"
        this.getCustomerById(this.idCustomer);
      }
    });
  }
  
  onSubmit(): void {
    this.submitted = true;

    if (this.customerForm.invalid) {
      return;
    }

    if (this.isCreated) {
      this.newCustomer();
    }
    else {
      this.editCustomer();
    }
  }

  editCustomer(): void {
    let data = {
      "customerId": this.idCustomer,
      "phone": this.customerForm.get('phone').value.toString(),
      "dateBirth": this.customerForm.get('dateBirth').value != '' ? this.customerForm.get('dateBirth').value.toISOString() : null,
      "genderId": this.customerForm.get('gender').value
    }

    this.service.editCustomer(this.idCustomer, data)
      .subscribe({
        next: () => {
          this.submitted = false;
          this.notifier.showSuccess('Cliente actualizado exitosamente', 5000, true);
          this.router.navigateByUrl('/customers');
        },
        error: error => {
          this.submitted = false;
          throw new HttpErrorResponse(error);
        }
      });
  }

  newCustomer(): void {
    let data = {
      "name": this.customerForm.get('name').value,
      "surname": this.customerForm.get('surname').value,
      "phone": this.customerForm.get('phone').value.toString(),
      "dateBirth": this.customerForm.get('dateBirth').value != '' ? this.customerForm.get('dateBirth').value.toISOString() : null,
      "genderId": this.customerForm.get('gender').value
    }

    console.log(data);

    this.service.newCustomer(data)
      .subscribe({
        next: () => {
          this.submitted = false;
          this.notifier.showSuccess('Cliente creado exitosamente', 5000, true);
          this.customerForm.setValue({
            name: '',
            surname: '',
            phone: '',
            dateBirth: null,
            gender: '',
          });
        },
        error: error => {
          this.submitted = false;
          throw new HttpErrorResponse(error);
        }
      });
  }

  getCustomerById(id: number): void {
    this.service.getById(id)
      .pipe(map(res => {
        if (res.succeded) {
          this.idCustomer = res.data['customerId'];
          this.isCreated = false;

          this.customerForm.setValue({
            name: res.data['name'],
            surname: res.data['surname'],
            phone: res.data['phone'],
            dateBirth: res.data['dateBirth'] ? new Date(res.data['dateBirth']) : '',
            gender: res.data['genderId'],
          });
        }
  
        return res;
      }))
      .subscribe();
  }
}
