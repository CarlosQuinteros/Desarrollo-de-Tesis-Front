import { NgModule , LOCALE_ID} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import localEs from '@angular/common/locales/es-AR'
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { interceptorProvider } from 'src/app/core/interceptors/usuario-interceptor.service';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';




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
