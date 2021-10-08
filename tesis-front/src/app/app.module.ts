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

import { ValidateEqualModule } from 'ng-validate-equal';
import { EnviarEmailComponent } from './usuarios/recuperarPassword/enviarEmail/enviar-email.component';
import { RecuperarPasswordComponent } from './usuarios/recuperarPassword/cambiarPassword/recuperar-password.component';
import { PerfilActualizarComponent } from './usuarios/perfil/perfil-actualizar.component';
import { interceptorProvider } from './interceptors/usuario-interceptor.service';
import { NuevoClubComponent } from './clubes/nuevo/nuevo-club.component';
import { ListaClubesComponent } from './clubes/lista/lista-clubes.component';
import { EditarClubComponent } from './clubes/editar/editar-club.component';

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
    EditarClubComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ValidateEqualModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'es-AR'}, interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
