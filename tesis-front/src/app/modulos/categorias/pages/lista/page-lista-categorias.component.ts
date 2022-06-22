import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-page-lista-categorias',
  templateUrl: './page-lista-categorias.component.html',
  styleUrls: ['./page-lista-categorias.component.css']
})
export class PageListaCategoriasComponent implements OnInit {

  home : MenuItem = {}
  items : MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this.cargarItems();
  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/inicio'}
    this.items = [
      {label: 'Categorias'},
      {label: 'Listado', disabled:true}
    ]
  }

}
