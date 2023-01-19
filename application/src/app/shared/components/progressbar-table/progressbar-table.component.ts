import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progressbar-table',
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
  styleUrls: ['./progressbar-table.component.scss']
})
export class ProgressbarTableComponent {
  @Input() title: string = 'Un momento por favor...';
  @Input() caption: string = '';
}
