import { NgModule , LOCALE_ID} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import localEs from '@angular/common/locales/es-AR'
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login.component';
import { NuevoUsuarioComponent } from './usuarios/nuevo/nuevo-usuario.component';
import { ListaUsuariosComponent } from './usuarios/lista/lista-usuarios.component';
import { NavBarComponent } from './NavBar/nav-bar.component';
import { DetalleUsuarioComponent } from './usuarios/detalle/detalle-usuario.component';
import { IndexComponent } from './index/index.component';
import { CambiarPasswordComponent } from './usuarios/cambiarPassword/cambiar-password.component';
import { FooterComponent } from './footer/footer.component';

import {TableModule} from 'primeng/table';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ValidateEqualModule } from 'ng-validate-equal';
import { EnviarEmailComponent } from './usuarios/recuperarPassword/enviarEmail/enviar-email.component';
import { RecuperarPasswordComponent } from './usuarios/recuperarPassword/cambiarPassword/recuperar-password.component';
import { PerfilActualizarComponent } from './usuarios/perfil/perfil-actualizar.component';
import { interceptorProvider } from './interceptors/usuario-interceptor.service';
import { NuevoClubComponent } from './clubes/nuevo/nuevo-club.component';
import { ListaClubesComponent } from './clubes/lista/lista-clubes.component';
import { EditarClubComponent } from './clubes/editar/editar-club.component';
import { CalendarModule } from 'primeng/calendar';
import { ListaLogsComponent } from './Logs/lista/lista-logs.component';
import {MultiSelectModule} from 'primeng/multiselect';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import {KeyFilterModule} from 'primeng/keyfilter';
import {SpeedDialModule} from 'primeng/speeddial';
import {MenuModule} from 'primeng/menu';
import {PanelModule} from 'primeng/panel';
import { NuevoJugadorComponent } from './jugadores/nuevo/nuevo-jugador.component';
import { ListadoJugadoresComponent } from './jugadores/lista/listado-jugadores.component';
import { ListaJugadoresActualesComponent } from './clubes/listaJugadoresActuales/lista-jugadores-actuales.component';
import { DetalleJugadorComponent } from './jugadores/detalle/detalle-jugador.component';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {TooltipModule} from 'primeng/tooltip';
import {ToolbarModule} from 'primeng/toolbar';

import { ListadoPasesJugadorComponent } from './jugadores/pases/lista/listado-pases-jugador.component';
import { ListadoPasesComponent } from './Pases/lista/listado-pases.component';
import { NuevoPaseJugadorComponent } from './jugadores/pases/nuevo/nuevo-pase-jugador.component';



registerLocaleData(localEs, "es-AR");
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NuevoUsuarioComponent,
    ListaUsuariosComponent,
    NavBarComponent,
    DetalleUsuarioComponent,
    IndexComponent,
    CambiarPasswordComponent,
    FooterComponent,
    EnviarEmailComponent,
    RecuperarPasswordComponent,
    PerfilActualizarComponent,
    NuevoClubComponent,
    ListaClubesComponent,
    EditarClubComponent,
    ListaLogsComponent,
    NuevoJugadorComponent,
    ListadoJugadoresComponent,
    ListaJugadoresActualesComponent,
    DetalleJugadorComponent,
    ListadoPasesJugadorComponent,
    ListadoPasesComponent,
    NuevoPaseJugadorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ValidateEqualModule,
    BrowserAnimationsModule,
    BrowserModule,
    TableModule,
    ContextMenuModule,
    DialogModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    CalendarModule,
    MultiSelectModule,
    CascadeSelectModule,
    KeyFilterModule,
    BreadcrumbModule,
    TooltipModule,
    SpeedDialModule,
    MenuModule,
    DialogModule,
    ToolbarModule,
    PanelModule

  ],
  providers: [{provide: LOCALE_ID, useValue: 'es-AR'}, interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
