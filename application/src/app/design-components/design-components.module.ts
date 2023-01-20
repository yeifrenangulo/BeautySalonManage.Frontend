import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CalendarModule } from 'primeng/calendar';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DividerModule } from 'primeng/divider';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MenubarModule } from 'primeng/menubar';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { NgxMaskModule, IConfig } from 'ngx-mask'

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDatepickerModule.forRoot(),
    NgxMaskModule.forRoot(maskConfig),
    TimepickerModule.forRoot()
  ],
  exports: [
    AvatarModule,
    ButtonModule,
    BsDatepickerModule,
    CalendarModule,
    DynamicDialogModule,
    DividerModule,
    InputSwitchModule,
    MenubarModule,
    NgxMaskModule,
    PaginatorModule,
    PanelModule,
    ProgressBarModule,
    TableModule,
    TagModule,
    TimepickerModule,
    ToastModule,
    TooltipModule,
  ]
})
export class DesignComponentsModule { }
