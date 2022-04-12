import { Component, OnInit } from '@angular/core';
import { Log } from 'src/app/core/modelo/log';
import { FechaDesdeHastaService } from 'src/app/servicios/fecha-desde-hasta.service';
import { LogService } from 'src/app/servicios/log.service';

@Component({
  selector: 'app-usuarios-mas-activos',
  templateUrl: './usuarios-mas-activos.component.html',
  styleUrls: ['./usuarios-mas-activos.component.css']
})
export class UsuariosMasActivosComponent implements OnInit {

  rangoFechas : Date[]  = [new Date(), new Date()];
  cantidadUsuarios : number = 0;
  cantidadMax : number = 5;
  data : any
  options : any
  Logs : Log[] = [];
  paletaDeColores = ['#003f5c','#2f4b7c', '#665191','#a05195', '#d45087', '#f95d6a', '#ff7c43', '#ffa600','#1c9be8', '#00b4eb', '#00c8cd', '#00d696', '#85dc56', '#e8d71f']
  cardSubtitulo : string = ''

  constructor(
    private logService: LogService,
    private FechaDesdeHastaService : FechaDesdeHastaService
  ) { }

  ngOnInit(): void {
    this.rangoFechas = this.FechaDesdeHastaService.getFechaDesdeHasta(this.rangoFechas[0], this.rangoFechas[1])
    this.obtenerLogs();

  }

  obtenerLogs(): void {
    this.logService.listaLogs().toPromise().then(
      data => {
        this.Logs = data;
        this.cargarGrafico(this.cantidadMax)
      }
    )
  }

  cargarGrafico(cantidadMaxima : number): void {
    this.cardSubtitulo = "Desde todos los tiempos";
    let usuariosActivos : {[key: string]: number} = {};
    //obtengo los nombres de usuarios, excepto 'admin'
    const nombresDeUsuarios = this.Logs.map(log => log.usuario.nombreUsuario).filter(usernames => usernames != 'admin');
    //en el objeto cargo, 'usuario': veces que aparece
    nombresDeUsuarios.forEach( username => {
      usuariosActivos[username] = !usuariosActivos[username] ? 1 : usuariosActivos[username] + 1;
    })
    //transforma el objeto en un array de objetos ordenado Desc [{usuario, times}]
    let masActivos = Object.keys(usuariosActivos)
                        .map(username => ({usuario: username, times: usuariosActivos[username]}))
                        .sort((a, b) => b.times - a.times)
                        .slice(0, cantidadMaxima);

    //obtengo labels y datos del grafico
    const labels = masActivos.map(usuario => usuario.usuario)
    const cantidad = masActivos.map(usuario => usuario.times);
    //grafico
    this.data = {
      labels : labels,
      datasets : [
        {
          label : 'Usuarios mas activos',
          backgroundColor : this.paletaDeColores[0],
          data : cantidad
        }
      ]
    }
    this.options = {
      indexAxis: 'y'
    }    
  }

  cargarGraficoConFiltro(): void {
    this.rangoFechas = this.FechaDesdeHastaService.getFechaDesdeHasta(this.rangoFechas[0], this.rangoFechas[1]);
    const fechaDesde = this.rangoFechas[0];
    const fechaHasta = this.rangoFechas[1];
    this.cardSubtitulo = `Desde ${fechaDesde.toLocaleDateString()} hasta ${fechaHasta.toLocaleDateString()}. `;
    let usuariosActivos : {[key: string]: number} = {};

    //obtengo los nombres de usuarios, excepto 'admin'
    const nombresDeUsuarios = this.Logs
                                  .filter(log => new Date(log.fecha)>= fechaDesde && new Date(log.fecha) <= fechaHasta)
                                  .map(log => log.usuario.nombreUsuario)
                                  .filter(usernames => usernames != 'admin');

    //en el objeto cargo, 'usuario': veces que aparece
    nombresDeUsuarios.forEach( username => {
      usuariosActivos[username] = !usuariosActivos[username] ? 1 : usuariosActivos[username] + 1;
    })

    //transforma el objeto en un array de objetos ordenado Desc [{usuario, times}]
    let masActivos = Object.keys(usuariosActivos)
                        .map(username => ({usuario: username, times: usuariosActivos[username]}))
                        .sort((a, b) => b.times - a.times)
                        .slice(0, this.cantidadMax);

    //obtengo labes y datos
    const labels = masActivos.map(usuario => usuario.usuario)
    const cantidad = masActivos.map(usuario => usuario.times);
    //grafico
    masActivos.length === 0 ? this.cardSubtitulo += 'Sin actividad' : null;
    this.data = {
      labels : labels,
      datasets : [
        {
          label : 'Usuarios mas activos',
          backgroundColor : this.paletaDeColores[0],
          data : cantidad
        }
      ]
    }
    this.options = {
      indexAxis: 'y'
    }    
  }

}
