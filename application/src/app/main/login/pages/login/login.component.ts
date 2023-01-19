import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@app/services/authentication.service';
import { NotificationService } from '@app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
    
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      switchValue: null
    });

    if (JSON.parse(localStorage.getItem('rememberUser'))) {
      let remember = JSON.parse(localStorage.getItem('rememberUser'));

      if (remember['remember']) {
        this.loginForm.setValue({
          username: remember['userName'],
          password: '',
          switchValue: remember['remember']
        });
      }
    }
  }

  get userInvalid() { return this.loginForm.get('username').invalid; }
  get passwordInvalid() { return this.loginForm.get('password').invalid; }
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notifier: NotificationService,
    private authenticationService: AuthenticationService
  ) { 
      if (this.authenticationService.userValue) { 
        this.router.navigate(['/']);
      }
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.loginForm.get('username').value, this.loginForm.get('password').value)
      .subscribe({
        next: () => {
          if (this.loginForm.get('switchValue').value) {
            localStorage.setItem('rememberUser', JSON.stringify({
              userName: this.loginForm.get('username').value,
              remember: true
            }));
          }
          else {
            localStorage.removeItem('rememberUser');
          }

          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
          this.router.navigateByUrl(returnUrl);
        },
        error: error => {
          this.loading = false;
          this.submitted = false;
          this.notifier.showWarning('');
          throw new HttpErrorResponse(error);
        }
      });
  }
}
