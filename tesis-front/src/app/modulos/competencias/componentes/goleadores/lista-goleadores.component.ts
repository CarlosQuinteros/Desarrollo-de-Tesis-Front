import { Component, Input, OnInit } from '@angular/core';
import { Goleador } from 'src/app/core/Dtos/competencias/goleador';
import { Competencia } from 'src/app/core/modelo/competencia';
import { CompetenciasService } from 'src/app/servicios/competencias.service';

@Component({
  selector: 'app-lista-goleadores',
  templateUrl: './lista-goleadores.component.html',
  styleUrls: ['./lista-goleadores.component.css']
})
export class ListaGoleadoresComponent implements OnInit {


  @Input() competencia! : Competencia;
  goleadores : Goleador[] = [];

  constructor(
    private competenciaService : CompetenciasService
  ) { }

  ngOnInit(): void {
    this.obtenerGoleadores(this.competencia.id);
  }

  obtenerGoleadores(idCompetencia : number):void{
    this.competenciaService.goleadoresDeCompetencia(idCompetencia).subscribe(
      data => {
        this.goleadores = data;
        //console.log(this.goleadores);
      },
      err => {
        console.log(err.error);
        
      }
    )
  }

}
