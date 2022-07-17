import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './NavBar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { DetallePartidoComponent } from './partidos/detalle-partido.component';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { MessageModule } from 'primeng/message';



@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent,
    DetallePartidoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TagModule,
    CardModule,
    ButtonModule,
    TableModule,
    RippleModule,
    TooltipModule,
    MessageModule
  ],
  exports: [
    NavBarComponent,
    FooterComponent,
    DetallePartidoComponent
  ]
})
export class SharedModule { }
