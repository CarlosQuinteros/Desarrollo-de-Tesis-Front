import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-competencia',
  templateUrl: './editar-competencia.component.html',
  styleUrls: ['./editar-competencia.component.css']
})
export class EditarCompetenciaComponent implements OnInit {

  home : MenuItem = {}
  items : MenuItem[] = [];
  competenciaDto : CompetenciaDto = new CompetenciaDto(0,0,'','','','',5,[]);
  clubes : Club[] = [];
  clubesParticipantes: Club[] = [];
  categorias : Categoria[] = [];
  asociaciones : AsociacionDeportiva[] = [];
  generos : string[] = [];
  idCompetencia : number = 0;

  constructor(
    private generoService: GeneroService,
    private clubService: ClubService,
    private competenciaService: CompetenciasService,
    private asociacionDeportivaService : AsociacionDeportivaService,
    private categoriaService : CategoriaService,
    private router: Router,
    private rutaActiva : ActivatedRoute,
    private location : Location
  ) { }

  ngOnInit(): void {
    this.idCompetencia = this.rutaActiva.snapshot.params.id;
    this.cargarItems();
    this.obtenerCompetencia();
    this.obtenerGeneros();
    this.obtenerClubes();
    this.obtenerCategorias();
    this.obtenerAsociacionesDeportivas();
  }


  obtenerCompetencia():void{
    this.competenciaService.detalleCompetencia(this.idCompetencia).subscribe(
      data => {
        this.competenciaDto.nombre = data.nombre;
        this.competenciaDto.descripcion = data.descripcion;
        this.competenciaDto.temporada = data.temporada;
        this.competenciaDto.tarjetasAmarillasPermitidas = data.tarjetasAmarillasPermitidas;
        this.competenciaDto.genero = data.genero;
        this.competenciaDto.idAsociacionDeportiva = data.asociacionDeportiva.id;
        this.competenciaDto.idCategoria = data.categoria.id;
        this.clubesParticipantes = data.clubesParticipantes;
      }
    )
  }

  editarCompetencia(): void{
    this.competenciaDto.clubesParticipantes = this.clubesParticipantes;
    console.log(this.competenciaDto);
    Swal.fire({
      title: '¿Editar Competencia?',
      text:'Las jornadas y partidos no serán afectados',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText:'Guardar',
      cancelButtonText: 'Cancelar',
      icon:'question'
    }).then((result) => {
      if(result.isConfirmed){
        this.solicitarEdicionCompetencia();
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
      {label: 'Editar', disabled:true}
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

  solicitarEdicionCompetencia(): void {
    this.competenciaService.editarCompetencia(this.competenciaDto, this.idCompetencia).subscribe(
      data => {
        Swal.fire({title:data.mensaje, text:'',icon:'success'});
        this.location.back();
      },
      err => {
        Swal.fire({title:'Error', text: err.error.message, icon:'error'});
      }
    )
  }

}
