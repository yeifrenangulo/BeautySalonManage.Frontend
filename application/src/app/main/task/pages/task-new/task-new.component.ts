import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '@app/models/service';
import { AuthenticationService } from '@app/services/authentication.service';
import { NotificationService } from '@app/services/notification.service';
import { TaskService } from '@app/services/task.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-task-new',
  templateUrl: './task-new.component.html',
  styleUrls: ['./task-new.component.scss']
})
export class TaskNewComponent {
  idTask: number;
  task: Task;
  taskForm: FormGroup;
  isCreated = true;
  loading = false;
  loadButton = false;
  submitted = false;
  titlePage = "Registrar";

  iconCancel = 'pi pi-times';
  iconSave = 'pi pi-check';

  get titleInvalid() { return this.taskForm.get('title').invalid; }
  get detailInvalid() { return this.taskForm.get('detail').invalid; }
  get durationInvalid() { return this.taskForm.get('duration').invalid; }
  get priceInvalid() { return this.taskForm.get('price').invalid; } 

  constructor(
    private formBuilder: FormBuilder, 
    private activatedRoute: ActivatedRoute, 
    private service: TaskService,
    private notifier: NotificationService,
    private auth: AuthenticationService,
    private router: Router
  ) {

    this.activatedRoute.params.subscribe(params => {
      this.idTask = params['id'];

      if (this.idTask) {
        this.isCreated = false;
        this.titlePage = "Modificar"
        this.getServiceById(this.idTask);
      }
    });
  }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      detail: ['', Validators.required],
      duration: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.taskForm.invalid) {
      return;
    }

    if (this.isCreated) {
      this.newService();
    }
    else {
      this.editService();
    }
  }

  editService(): void {
    this.loaderButton(true);

    let data = {
      "serviceId": this.idTask,
      "title": this.taskForm.get('title').value,
      "detail": this.taskForm.get('detail').value,
      "duration": this.taskForm.get('duration').value,
      "price": this.taskForm.get('price').value,
      "userName": this.auth.userValue.userName
    }

    this.service.editService(this.idTask, data)
      .subscribe({
        next: () => {
          this.loaderButton(false);
          this.submitted = false;
          this.notifier.showSuccess('Servicio actualizado exitosamente', 5000, true);
          this.router.navigateByUrl('/services');
        },
        error: error => {
          this.loaderButton(false);
          this.submitted = false;
          this.notifier.triggerToast();
          throw new HttpErrorResponse(error);
        }
      });
  }

  newService(): void {
    this.loaderButton(true);

    let data = {
      "title": this.taskForm.get('title').value,
      "detail": this.taskForm.get('detail').value,
      "duration": this.formatDuration(this.taskForm.get('duration').value),
      "price": this.taskForm.get('price').value,
      "userName": this.auth.userValue.userName
    }

    this.service.newService(data)
      .subscribe({
        next: () => {
          this.submitted = false;
          this.notifier.showSuccess('Servicio creado exitosamente', 5000, true);
          this.taskForm.setValue({
            title: '',
            detail: '',
            duration: '',
            price: ''
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

  getServiceById(id: number): void {
    this.loading = true;
    this.service.getById(id)
      .pipe(map(res => {
        if (res.succeded) {
          this.idTask = res.data['serviceId'];
          this.isCreated = false;

          this.taskForm.setValue({
            title: res.data['title'],
            detail: res.data['detail'],
            duration: res.data['duration'],
            price: res.data['price']
          });
        }
  
        return res;
      }))
      .subscribe(() => this.loading = false);
  }

  formatDuration(duration: string): string {
    console.log(duration);
    return `${duration.substr(0, 2)}:${duration.substring(2)}`;
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
