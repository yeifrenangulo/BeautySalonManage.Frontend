import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComponent } from './layout/menu/menu.component';
import { DesignComponentsModule } from '@app/design-components/design-components.module';
import { RouterModule } from '@angular/router';
import { FormatDatePipe, FormatStringPipe } from '@app/pipes/format-string.pipe';
import { EmptyComponent } from './components/empty/empty.component';
import { ProgressbarTableComponent } from './components/progressbar-table/progressbar-table.component';
import { SpinnerPageComponent } from './components/spinner-page/spinner-page.component';


@NgModule({
  declarations: [
    EmptyComponent,
    FormatDatePipe,
    FormatStringPipe,
    MenuComponent, 
    ProgressbarTableComponent, 
    SpinnerPageComponent
  ],
  imports: [
    CommonModule,
    DesignComponentsModule,
    RouterModule,
  ],
  exports: [
    EmptyComponent,
    FormatDatePipe,
    FormatStringPipe,
    MenuComponent,
    ProgressbarTableComponent,
    SpinnerPageComponent
  ]
})
export class SharedModule { }
