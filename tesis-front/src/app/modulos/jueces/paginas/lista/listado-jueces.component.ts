import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-listado-jueces',
  templateUrl: './listado-jueces.component.html',
  styleUrls: ['./listado-jueces.component.css']
})
export class ListadoJuecesComponent implements OnInit {

  items : MenuItem[] = [];
  home : MenuItem = {}
  constructor() { }

  ngOnInit(): void {
    this.cargarItems();
  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/inicio'}
    this.items = [
      {label:"Jueces"},
      {label:"Listado", disabled:true},
    ]
  }


}
