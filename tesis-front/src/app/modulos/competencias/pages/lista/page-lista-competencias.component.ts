import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-page-lista-competencias',
  templateUrl: './page-lista-competencias.component.html',
  styleUrls: ['./page-lista-competencias.component.css']
})
export class PageListaCompetenciasComponent implements OnInit {

  home : MenuItem = {};
  items : MenuItem[] = [];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarItems();
  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/inicio'};
    this.items = [
      {label:'Competencias'},
      {label:'Listado', disabled:true}
    ];
  }

}
