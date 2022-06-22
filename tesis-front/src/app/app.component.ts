import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private primeNgConfig : PrimeNGConfig){

  }

  ngOnInit(): void {
    this.primeNgConfig.ripple = true;
    this.primeNgConfig.setTranslation({
      matchAll: 'Coincidir todos',
      matchAny: 'Coincidir con cualquiera',
      accept : 'Aceptar',
      before: 'Antes',
      after:'Despues',
      contains:'Contiene',
      startsWith: 'Comienza con',
      endsWith: 'Finaliza con',
      equals: 'Es igual a',
      notEquals: 'No es igual a',
      notContains: 'No contiene',
      lt: 'Menor que',
      lte: 'Menor o igual que',
      gt: 'Mayor que',
      gte: 'Mayor o igual que',
      dateAfter: 'La fecha es posterior a',
      dateBefore: 'La fecha es anterior a',
      dateIs: 'La fecha es',
      dateIsNot: 'La fecha no es',
      addRule: 'Agregar regla',
      removeRule: "Eliminar regla",
      clear: 'Limpiar',
      apply: 'Aplicar',
      dayNames: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
      dayNamesShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
      dayNamesMin: ["Do","Lu","Ma","Mi","Ju","Vi","Sa"],
      monthNames: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
      monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun","Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
      today: 'Hoy',
      dateFormat: 'dd/mm/yy'
    })
    document.documentElement.style.fontSize = '15px';

  }

  title = 'tesis-front';
}
