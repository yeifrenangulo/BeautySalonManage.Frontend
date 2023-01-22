import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '@app/models/customer';
import { CustomerService } from '@app/services/customer.service';
import { NotificationService } from '@app/services/notification.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { esLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { map } from 'rxjs';

@Component({
  selector: 'app-customer-new',
  templateUrl: './customer-new.component.html',
  styleUrls: ['./customer-new.component.scss']
})
export class CustomerNewComponent {
  idCustomer: number;
  customer: Customer;
  customerForm: FormGroup;
  configDate: any;
  isCreated = true;
  loading = false;
  submitted = false;
  titlePage = "Registrar";
  loadButton = false;
  iconCancel = 'pi pi-times';
  iconSave = 'pi pi-check';

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

      if (this.idCustomer) {
        this.isCreated = false;
        this.titlePage = "Modificar"
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
    this.loaderButton(true);

    let data = {
      "customerId": this.idCustomer,
      "phone": this.customerForm.get('phone').value.toString(),
      "dateBirth": this.customerForm.get('dateBirth').value != '' ? this.customerForm.get('dateBirth').value.toISOString() : null,
      "genderId": this.customerForm.get('gender').value
    }

    this.service.editCustomer(this.idCustomer, data)
      .subscribe({
        next: () => {
          this.loaderButton(false);
          this.submitted = false;
          this.notifier.showSuccess('Cliente actualizado exitosamente', 5000, true);
          this.router.navigateByUrl('/customers');
        },
        error: error => {
          this.loaderButton(false);
          this.submitted = false;
          this.notifier.triggerToast();
          throw new HttpErrorResponse(error);
        }
      });
  }

  newCustomer(): void {
    this.loaderButton(true);

    let data = {
      "name": this.customerForm.get('name').value,
      "surname": this.customerForm.get('surname').value,
      "phone": this.customerForm.get('phone').value.toString(),
      "dateBirth": this.customerForm.get('dateBirth').value ?? this.customerForm.get('dateBirth').value.toISOString(),
      "genderId": this.customerForm.get('gender').value
    }

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
          this.loaderButton(false);
        },
        error: error => {
          this.loaderButton(false);
          this.submitted = false;
          this.notifier.triggerToast();
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

  loaderButton(active: boolean) {
    if (active) {
      this.loadButton = true;
      this.iconCancel = 'pi pi-spin pi-spinner';
      this.iconSave = 'pi pi-spin pi-spinner';
    }
    else {
      this.loadButton = false;
      this.iconCancel = 'pi pi-times';
      this.iconSave = 'pi pi-check';
    }
  }
}
