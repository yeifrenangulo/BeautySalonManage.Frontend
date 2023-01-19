import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner-page',
  template: `
    <div class="spin-loader">
      <div class="loader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="text-loader text-center">
        <h1 class="display-6 text-muted">{{ title }}</h1>
        <span class="text-muted">{{ caption }}</span>
      </div>
    </div>
  `,
  styleUrls: ['./spinner-page.component.scss']
})
export class SpinnerPageComponent {
  @Input() title: string = 'Un momento por favor...';
  @Input() caption: string = '';
}
