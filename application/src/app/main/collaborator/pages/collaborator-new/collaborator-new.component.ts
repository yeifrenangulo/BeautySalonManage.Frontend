import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Utilities } from '@app/helpers/utilities';
import { Collaborator, Service } from '@app/models/collaborator';
import { Task } from '@app/models/service';
import { CollaboratorService } from '@app/services/collaborator.service';
import { NotificationService } from '@app/services/notification.service';
import { TaskService } from '@app/services/task.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-collaborator-new',
  templateUrl: './collaborator-new.component.html',
  styleUrls: ['./collaborator-new.component.scss']
})
export class CollaboratorNewComponent {
  idCollaborator: number;
  collaborator: Collaborator;
  tasks: Task[] = [];
  collaboratorForm: FormGroup;
  isCreated = true;
  loading = false;
  submitted = false;
  titlePage = "Registrar";
  loadButton = false;
  iconCancel = 'pi pi-times';
  iconSave = 'pi pi-check';

  get nameControl() { return this.collaboratorForm.get('name'); }
  get surnameControl() { return this.collaboratorForm.get('surname'); }
  get phoneControl() { return this.collaboratorForm.get('phone'); }
  get addressControl() { return this.collaboratorForm.get('address'); }
  get emailControl() { return this.collaboratorForm.get('email'); }
  get nameContactControl() { return this.collaboratorForm.get('nameContact'); } 
  get genderControl() { return this.collaboratorForm.get('genderId'); } 
  get services() { return this.collaboratorForm.controls["services"] as FormArray; }

  serviceInvalid(index: number) { 
    return this.services.controls[index].get('serviceId').invalid;
  }

  percentageInvalid(index: number) { 
    return this.services.controls[index].get('percentage').invalid; 
  } 

  constructor(
    private formBuilder: FormBuilder, 
    private activatedRoute: ActivatedRoute, 
    private collaboratorService: CollaboratorService,
    private taskService: TaskService,
    private notifier: NotificationService,
    private router: Router,
    private utility: Utilities
  ) {

    this.activatedRoute.params.subscribe(params => {
      this.idCollaborator = params['id'];

      if (this.idCollaborator) {
        this.isCreated = false;
        this.titlePage = "Modificar"
        this.getCollaboratorById(this.idCollaborator);
      }
    });
  }
  
  ngOnInit(): void {
    this.getServices();
    this.createdForm();
  }

  getServices():void {
    this.taskService.getAll({}).pipe(map(res => {
      if (res.succeded) {
        this.tasks = res.data;
      }

      return res;
    }))
    .subscribe();
  }

  onSubmit() {
    this.submitted = true;

    if (this.collaboratorForm.invalid) {
      return;
    }

    if (this.isCreated) {
      this.newCollaborator();
    }
    else {
      this.editCollaborator();
    }
  }

  editCollaborator() {
    this.loaderButton(true);

    this.collaboratorService.editCollaborator(this.idCollaborator, this.collaboratorForm.value)
      .subscribe({
        next: () => {
          this.loaderButton(false);
          this.submitted = false;
          this.notifier.showSuccess('Colaborador modificado exitosamente', 5000, true);
          this.router.navigateByUrl('/collaborators');
        },
        error: error => {
          this.loaderButton(false);
          this.submitted = false;
          this.notifier.triggerToast();
          throw new HttpErrorResponse(error);
        }
      });
  }

  newCollaborator() {
    this.loaderButton(true);

    this.collaboratorService.newCollaborator(this.collaboratorForm.value)
      .subscribe({
        next: () => {
          this.submitted = false;
          this.notifier.showSuccess('Colaborador registrado exitosamente', 5000, true);
          this.collaboratorForm.reset({ color: '#FF725E' });
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

  getCollaboratorById(id: number) {
    this.collaboratorService.getById(id)
      .subscribe({
        next: (response) => {
          this.idCollaborator = response.collaboratorId;
          this.isCreated = false;

          this.collaboratorForm.patchValue({
            name: response.name,
            surname: response.surname,
            phone: response.phone,
            address: response.address,
            email: response.email,
            nameContact: response.nameContact,
            phoneContact: response.phoneContact,
            genderId: response.genderId,
            color: response.color ?? '#FF725E'
          });

          this.addServices(response.services);
        },
        error: error => {
          this.notifier.triggerToast();
          throw new HttpErrorResponse(error);
        } 
      });
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

  addServices(datas: any[]) {
    if (datas.length > 0) {
      for (let data of datas) {
        const service = this.formBuilder.group({
          serviceId: [data['serviceId'], Validators.required],
          percentage: [data['percentage'], Validators.required]
        });
    
        this.services.push(service);
      }
    }
  }

  addService() {
    const service = this.formBuilder.group({
      serviceId: ['', Validators.required],
      percentage: ['', Validators.required]
    });

    this.services.push(service);
  }

  removeService(index: number) {
    this.services.removeAt(index);
  }

  onKeyupEvent(event: any) {
    const value = event.target.value;

    this.collaboratorForm.patchValue({
      name: this.nameControl.value.toLowerCase() == value.toLowerCase() ? this.utility.stringCapitalize(value) : this.nameControl.value,
      surname: this.surnameControl.value.toLowerCase() == value.toLowerCase() ? this.utility.stringCapitalize(value) : this.surnameControl.value,
      nameContact: this.nameContactControl.value.toLowerCase() == value.toLowerCase() ? this.utility.stringCapitalize(value) : this.nameContactControl.value,
    });
  }

  createdForm() {
    this.collaboratorForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      genderId: ['', Validators.required],
      nameContact: '',
      phoneContact: '',
      color: '#FF725E',
      services: this.formBuilder.array([])
    });
  }
}
