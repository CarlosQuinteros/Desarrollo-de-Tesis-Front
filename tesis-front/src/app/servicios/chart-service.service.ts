import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../modelo/usuario';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ChartServiceService {

  paletaDeColores = ['#003f5c','#2f4b7c', '#665191','#a05195', '#d45087', '#f95d6a', '#ff7c43', '#ffa600','#1c9be8', '#00b4eb', '#00c8cd', '#00d696', '#85dc56', '#e8d71f']

  constructor(private usuariosService : UsuarioService) { }

  public pieCharCantidadUsuariosActivosEInactivos(usuarios : Usuario[]):any{
    const data = {
      labels: ['Activos', 'Inactivos'],
      datasets: [
        {
          data: [
            usuarios.filter(u => u.activo === true).length,
            usuarios.filter(u => u.activo === false).length,
          ],
          backgroundColor: ['#14854c', '#d41740', '#14854c', '#d41740'],
          hoverBackgroundColor: ['#519259', '#DD4A48'],
        },
      ],
    };
    return data;
  }

  public formatearPieChart(labels: string[], datos:any) : any{
    const chart = {
      labels: labels,
      datasets: [
          {
              data: datos,
              backgroundColor: this.paletaDeColores
          }
      ]
    };
    return chart;
  }
}
