import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { CompetenciaDto } from 'src/app/core/Dtos/competencias/competencia-dto';
import { AsociacionDeportiva } from 'src/app/core/modelo/asociacion-deportiva';
import { Categoria } from 'src/app/core/modelo/categoria';
import { Club } from 'src/app/core/modelo/club';
import { AsociacionDeportivaService } from 'src/app/servicios/asociacion-deportiva.service';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { ClubService } from 'src/app/servicios/club.service';
import { CompetenciasService } from 'src/app/servicios/competencias.service';
import { GeneroService } from 'src/app/servicios/genero.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-nueva-competencia',
  templateUrl: './nueva-competencia.component.html',
  styleUrls: ['./nueva-competencia.component.css']
})
export class NuevaCompetenciaComponent implements OnInit {

  home : MenuItem = {}
  items : MenuItem[] = [];
  competenciaDto : CompetenciaDto = new CompetenciaDto(0,0,'','','','',5,[]);
  clubes : Club[] = [];
  clubesParticipantes: Club[] = [];
  categorias : Categoria[] = [];
  asociaciones : AsociacionDeportiva[] = [];
  generos : string[] = [];

  constructor(
    private clubService: ClubService,
    private categoriaService : CategoriaService,
    private asociacionDeportivaService: AsociacionDeportivaService,
    private generoService : GeneroService,
    private competenciaService : CompetenciasService,
    private location : Location,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.cargarItems();
    this.obtenerGeneros();
    this.obtenerClubes();
    this.obtenerCategorias();
    this.obtenerAsociacionesDeportivas();
  }

  crearNuevaCompetencia(): void{
    this.competenciaDto.clubesParticipantes = this.clubesParticipantes;
    console.log(this.competenciaDto);
    Swal.fire({
      title: '¿Crear nueva Competencia?',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText:'Crear',
      cancelButtonText: 'Cancelar',
      icon:'question'
    }).then((result) => {
      if(result.isConfirmed){
        this.solicitarCreacionCompetencia();
      }
    })
    
  }

  goBack():void{
    this.location.back();
  }

  leyendaClubesSelccionados(): string {
    return `${this.clubesParticipantes.length} clubes seleccionados`;
  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/inicio'};
    this.items = [
      {label: 'Competencias', routerLink:'/competencias'},
      {label: 'Nueva competencia', disabled:true}
    ];
  }

  obtenerGeneros():void{
    this.generoService.listadoDeGeneros().subscribe(
      data => {
        this.generos = data;
      }
    )
  }

  obtenerClubes():void{
    this.clubService.listaClubes().subscribe(
      data => {
        this.clubes = data;
      }
    )
  }

  obtenerCategorias():void{
    this.categoriaService.listadoCategorias().subscribe(
      data => {
        this.categorias = data;
      }
    )
  }

  obtenerAsociacionesDeportivas():void{
    this.asociacionDeportivaService.listadoAsociaciones().subscribe(
      data => {
        this.asociaciones = data;
      }
    )
  }

  solicitarCreacionCompetencia(): void {
    this.competenciaService.crearCompetencia(this.competenciaDto).subscribe(
      data => {
        Swal.fire({title:data.mensaje, text:'',icon:'success'});
      },
      err => {
        Swal.fire({title:'Error', text: err.error.message, icon:'error'});
      }
    )
  }

}
