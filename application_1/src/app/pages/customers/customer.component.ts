import { Component } from '@angular/core';

@Component({
  selector: 'app-customer',
  template: `
    <div class="container-page">
      <div class="container mt-2">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class CustomerComponent {
  
}
