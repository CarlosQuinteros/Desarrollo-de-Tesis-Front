import { NgModule , LOCALE_ID} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import localEs from '@angular/common/locales/es-AR'
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NuevoUsuarioComponent } from './modulos/usuarios/nuevo/nuevo-usuario.component';
import { ListaUsuariosComponent } from './modulos/usuarios/lista/lista-usuarios.component';
import { NavBarComponent } from './shared/NavBar/nav-bar.component';
import { DetalleUsuarioComponent } from './modulos/usuarios/detalle/detalle-usuario.component';
import { CambiarPasswordComponent } from './modulos/usuarios/cambiarPassword/cambiar-password.component';
import { FooterComponent } from './shared/footer/footer.component';

import {TableModule} from 'primeng/table';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ValidateEqualModule } from 'ng-validate-equal';
import { EnviarEmailComponent } from './modulos/recuperacion-password/enviarEmail/enviar-email.component';
import { RecuperarPasswordComponent } from './modulos/recuperacion-password/cambiarPassword/recuperar-password.component';
import { PerfilActualizarComponent } from './modulos/usuarios/perfil/perfil-actualizar.component';
import { interceptorProvider } from 'src/app/core/interceptors/usuario-interceptor.service';
import { NuevoClubComponent } from './modulos/clubes/nuevo/nuevo-club.component';
import { ListaClubesComponent } from './modulos/clubes/lista/lista-clubes.component';
import { EditarClubComponent } from './modulos/clubes/editar/editar-club.component';
import { CalendarModule } from 'primeng/calendar';
import {MultiSelectModule} from 'primeng/multiselect';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import {KeyFilterModule} from 'primeng/keyfilter';
import {SpeedDialModule} from 'primeng/speeddial';
import {MenuModule} from 'primeng/menu';
import {PanelModule} from 'primeng/panel';
import { NuevoJugadorComponent } from './modulos/jugadores/nuevo/nuevo-jugador.component';
import { ListadoJugadoresComponent } from './modulos/jugadores/lista/listado-jugadores.component';
import { ListaJugadoresActualesComponent } from './modulos/clubes/listaJugadoresActuales/lista-jugadores-actuales.component';
import { DetalleJugadorComponent } from './modulos/jugadores/detalle/detalle-jugador.component';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {TooltipModule} from 'primeng/tooltip';
import {ToolbarModule} from 'primeng/toolbar';
import {RippleModule} from 'primeng/ripple';
import { ChipModule } from 'primeng/chip';
import {InputNumberModule} from 'primeng/inputnumber';
import {ChartModule} from 'primeng/chart';
import {CardModule} from 'primeng/card';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ScrollTopModule} from 'primeng/scrolltop';

import { ListadoPasesJugadorComponent } from './modulos/jugadores/pases/lista/listado-pases-jugador.component';
import { ListadoPasesComponent } from './modulos/pases/lista/listado-pases.component';
import { NuevoPaseJugadorComponent } from './modulos/jugadores/pases/nuevo/nuevo-pase-jugador.component';
import { ReporteDeActividadComponent } from './modulos/reportes/usuarios/reporte-de-actividad.component';
import { UsuariosMasActivosComponent } from './modulos/reportes/usuarios/usuariosMasActivos/usuarios-mas-activos.component';
import { ActividadPorUsuarioComponent } from './modulos/reportes/usuarios/actividadPorUsuario/actividad-por-usuario.component';



registerLocaleData(localEs, "es-AR");
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    InputTextModule,
    TooltipModule,
    MenuModule,
    RippleModule

  ],
  providers: [{provide: LOCALE_ID, useValue: 'es-AR'}, interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
