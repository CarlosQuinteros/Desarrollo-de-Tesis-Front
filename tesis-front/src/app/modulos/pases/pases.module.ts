import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasesRoutingModule } from './pases-routing.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ListadoPasesComponent } from './lista/listado-pases.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ScrollTopModule } from 'primeng/scrolltop';
import { TooltipModule } from 'primeng/tooltip';


@NgModule({
  declarations: [
    ListadoPasesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    PasesRoutingModule,
    BreadcrumbModule,
    CardModule,
    TableModule,
    MessagesModule,
    MessageModule,
    DialogModule,
    ButtonModule,
    SharedModule,
    CardModule,
    ScrollTopModule,
    TooltipModule
  ]
})
export class PasesModule { }
