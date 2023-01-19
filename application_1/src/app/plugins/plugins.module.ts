import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxPaginationModule } from 'ngx-pagination';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormatStringPipe, FormatDatePipe } from '@app/pipes/format-string.pipe';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzModalModule } from 'ng-zorro-antd/modal';

import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};

const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
  declarations: [
    FormatDatePipe,
    FormatStringPipe,
  ],
  imports: [
    CommonModule,
    NzModalModule,
    NzButtonModule,
    NzToolTipModule,
    NzPaginationModule,
    NzSpinModule,
    NzEmptyModule,
    NzIconModule.forRoot(icons),
    NzTableModule,
    NzSwitchModule,
    NzDividerModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    TooltipModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
    }),
  ],
  exports: [
    NzEmptyModule,
    NzModalModule,
    NzSpinModule,
    NzButtonModule,
    NzToolTipModule,
    NzPaginationModule,
    ToastrModule,
    NzIconModule,
    NzTableModule,
    NzSwitchModule,
    FormatDatePipe,
    NzDividerModule,
    FormatStringPipe,
    BsDatepickerModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
  ]
})
export class PluginsModule { }
