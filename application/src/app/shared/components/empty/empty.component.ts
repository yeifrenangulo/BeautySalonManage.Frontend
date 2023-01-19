import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty',
  template: `
    <div class="container text-center">
      <img src="../../../../assets/img/empty-box.png" alt="Empty" width="250" height="250">
      <h1 class="display-5 text-muted">{{ title }}</h1>
      <span class="text-muted">{{ caption }}</span>
    </div>
  `
})
export class EmptyComponent {
  @Input() title: string = 'No hay datos';
  @Input() caption: string = '';
}
