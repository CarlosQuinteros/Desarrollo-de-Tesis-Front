import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-page-lista-asociaciones-deportivas',
  templateUrl: './page-lista-asociaciones-deportivas.component.html',
  styleUrls: ['./page-lista-asociaciones-deportivas.component.css']
})
export class PageListaAsociacionesDeportivasComponent implements OnInit {

  items : MenuItem[] = [];
  home : MenuItem = {}

  constructor() { }

  ngOnInit(): void {
    this.cargarItems();
  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/inicio'};
    this.items = [
      {label:'Asociaciones Deportivas'},
      {label:'Listado', disabled:true},
    ]
  }

}
