import { Component } from '@angular/core';

@Component({
  selector: 'app-customer',
  template: `
    <div class="container container-customer mt-5 animate__animated animate__fadeInRight">
      <router-outlet></router-outlet>
    </div>
  `
})
export class CustomerComponent {
  
}
