import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { CategoriaDto } from 'src/app/core/Dtos/categorias/categoria-dto';
import { TipoCategoria } from 'src/app/core/modelo/TipoCategoria';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit {

  home : MenuItem = {}
  items : MenuItem[] = [];
  idCategoria : number = 0;
  tipoCategorias : TipoCategoria []= [
    {tipo:'SIN_RESTRICCIONES',  edadMin:5, edadMax:65, visibleEdadMin:false, visibleEdadMax:false,textoInfo:'Edad min: 5 y max: 65'},
    {tipo:'HASTA_EDAD', edadMin:5, edadMax:13, visibleEdadMin:false, visibleEdadMax:true,textoInfo:'Edad min: 5 y max ingresada'},
    {tipo:'DESDE_EDAD',  edadMin: 13, edadMax:65, visibleEdadMin:true, visibleEdadMax:false,textoInfo:'Edad min ingresada y edad max: 65'},
    {tipo:'ENTRE_EDADES',  edadMin:15, edadMax:20, visibleEdadMin:true, visibleEdadMax:true, textoInfo:'Se deben ingresar ambas edades'},

  ]
  categoriaDto : CategoriaDto = new CategoriaDto('','','',0,0);
  selectedTipo: string ='';
  visibleEdadMin :boolean = false;
  visibleEdadMax :boolean = false;
  textoInfo: string = '';

  constructor(
    private router : Router,
    private rutaActiva : ActivatedRoute,
    private categoriaService : CategoriaService,
    private location : Location
  ) { }

  ngOnInit(): void {
    this.idCategoria = this.rutaActiva.snapshot.params.id;
    this.cargarItems();
    this.obtenerCategoria(this.idCategoria);
  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/inicio'};
    this.items = [
      {label:'Categorias', routerLink:'/categorias'},
      {label:'Detalle', disabled:true}
    ]
  }

  goBack():void{
    this.location.back();
  }

  obtenerCategoria(id: number): void {
    this.categoriaService.detalleCategoria(id).toPromise().then(
      data => {
        let tipoCategoria = this.tipoCategorias.find(cat => cat.tipo === data.tipo)!;
        this.categoriaDto.nombre = data.nombre;
        this.categoriaDto.descripcion = data.descripcion;
        this.categoriaDto.tipo = data.tipo;
        this.categoriaDto.edadMinima = data.edadMinima;
        this.categoriaDto.edadMaxima = data.edadMaxima;
        this.selectedTipo = data.tipo;
        this.visibleEdadMin = tipoCategoria.visibleEdadMin;
        this.visibleEdadMax = tipoCategoria.visibleEdadMax;
        this.textoInfo = tipoCategoria.textoInfo;
        //console.log(this.categoriaDto);
      }
    )
  }

  onChangeTipo(e : Event){
    this.cargarCategoriaDto(this.selectedTipo);
  }

  cargarCategoriaDto(tipo : string){
    let categoria = this.tipoCategorias.find(cat => cat.tipo === tipo);
    this.categoriaDto.tipo = categoria!.tipo;
    this.categoriaDto.edadMinima = categoria!.edadMin;
    this.categoriaDto.edadMaxima = categoria!.edadMax;
    this.visibleEdadMin = categoria!.visibleEdadMin;
    this.visibleEdadMax = categoria!.visibleEdadMax;
    this.textoInfo = categoria!.textoInfo;

  }

  editarCategoria(): void {
    const categoriaEditada : CategoriaDto = {...this.categoriaDto};
    console.log(categoriaEditada);
    Swal.fire({
      icon:'question',
      title:'¿Realmente deseas editar la Categoria?',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Editar'
    }).then((result) => {
      if(result.isConfirmed){
        this.solicitarEdicionCategoria(categoriaEditada, this.idCategoria);
      }
    })
  }

  solicitarEdicionCategoria(categoria : CategoriaDto, id:number):void{
    this.categoriaService.editarCategoria(categoria, id).subscribe(
      data => {
        Swal.fire('Categoria editada correctamente', 'Te redireccionamos al listado', 'success');
        this.router.navigate(['/categorias']);
      }
      ,
      err =>{
        Swal.fire('Error', err.error.message, 'error');
      }
    )
  }


}
