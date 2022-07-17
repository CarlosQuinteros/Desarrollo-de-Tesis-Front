import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Competencia } from 'src/app/core/modelo/competencia';
import { CompetenciasService } from 'src/app/servicios/competencias.service';

@Component({
  selector: 'app-detalle-competencia',
  templateUrl: './detalle-competencia.component.html',
  styleUrls: ['./detalle-competencia.component.css']
})
export class DetalleCompetenciaComponent implements OnInit {

  @Input() competencia! : Competencia;

  constructor(
    private rutaActiva : ActivatedRoute,
    private competenciaService: CompetenciasService
  ) { }

  ngOnInit(): void {
  }

}
