import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogsRoutingModule } from './logs-routing.module';
import { FormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import {ScrollTopModule} from 'primeng/scrolltop';
import { ListaLogsComponent } from './lista/lista-logs.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardModule } from 'primeng/card';


@NgModule({
  declarations: [
    ListaLogsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LogsRoutingModule,
    BreadcrumbModule,
    ButtonModule,
    TableModule,
    RouterModule,
    SharedModule,
    DropdownModule,
    ScrollTopModule,
    CardModule
  ]
})
export class LogsModule { }
