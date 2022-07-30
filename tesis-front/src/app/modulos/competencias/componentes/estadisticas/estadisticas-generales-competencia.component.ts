import { Component, Input, OnInit } from '@angular/core';
import { EstadisticasGeneralesCompetencia } from 'src/app/core/Dtos/competencias/estadisticas-generales-competencia';
import { Competencia } from 'src/app/core/modelo/competencia';
import { ChartServiceService } from 'src/app/servicios/chart-service.service';
import { EstadisticasCompetenciaService } from 'src/app/servicios/estadisticas-competencia.service';

@Component({
  selector: 'app-estadisticas-generales-competencia',
  templateUrl: './estadisticas-generales-competencia.component.html',
  styleUrls: ['./estadisticas-generales-competencia.component.css']
})
export class EstadisticasGeneralesCompetenciaComponent implements OnInit {

  @Input () competencia! : Competencia;
  estadisticasGenerales : EstadisticasGeneralesCompetencia = new EstadisticasGeneralesCompetencia(0,0,0,0,0,0);
  labels : string[] = ["Victorias Locales", "Victorias Visitantes", "Empates"];
  datos : number[] = [];
  chart : any;
  textoMediaGoles : string = '';
  textoCantidadGoles : string = '';
  cantidadPartidos : number = 0;

  constructor(
    private estadisticasCompetencia : EstadisticasCompetenciaService,
    private chartService : ChartServiceService
  ) { }

  ngOnInit(): void {
    this.cargarGrafico(this.competencia.id);
    
  }

  cargarGrafico(id: number): void {
    this.estadisticasCompetencia.estadisticasGenerales(id).subscribe(
      data => {
        this.estadisticasGenerales = data;
        this.cantidadPartidos = data.victoriasLocales + data.victoriasVisitantes + data.empates;
        this.datos = [data.victoriasLocales, data.victoriasVisitantes, data.empates];
        this.chart = this.chartService.formatearPieChart(this.labels, this.datos);
        this.textoMediaGoles = `${this.estadisticasGenerales.cantidadGolesLocales + this.estadisticasGenerales.cantidadGolesVisitantes} goles en ${this.cantidadPartidos} partidos. Media: ${this.estadisticasGenerales.mediaGoles.toPrecision(2)}`;
        this.textoCantidadGoles = `Goles Locales: ${this.estadisticasGenerales.cantidadGolesLocales} - Goles Visitantes: ${this.estadisticasGenerales.cantidadGolesVisitantes}`;
      }
    )
  }

}
