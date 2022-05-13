import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { IndexComponent } from './index.component';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    RouterModule,
    SharedModule,
    CardModule,
    ChipModule
  ]
})
export class InicioModule { }
