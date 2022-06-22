import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { CategoriaDto } from 'src/app/core/Dtos/categorias/categoria-dto';
import { TipoCategoria } from 'src/app/core/modelo/TipoCategoria';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-categoria',
  templateUrl: './nueva-categoria.component.html',
  styleUrls: ['./nueva-categoria.component.css']
})

export class NuevaCategoriaComponent implements OnInit {

  home: MenuItem = {}
  items : MenuItem[] = [];
  tipoCategorias : TipoCategoria []= [
    {tipo:'SIN_RESTRICCIONES',  edadMin:5, edadMax:65, visibleEdadMin:false, visibleEdadMax:false,textoInfo:'Edad min: 5 y max: 65'},
    {tipo:'HASTA_EDAD',         edadMin:5, edadMax:13, visibleEdadMin:false, visibleEdadMax:true,textoInfo:'Edad min: 5 y max ingresada'},
    {tipo:'DESDE_EDAD',         edadMin: 13, edadMax:65, visibleEdadMin:true, visibleEdadMax:false,textoInfo:'Edad min ingresada y edad max: 65'},
    {tipo:'ENTRE_EDADES',       edadMin:15, edadMax:20, visibleEdadMin:true, visibleEdadMax:true, textoInfo:'Se deben ingresar ambas edades'},

  ]
  categoriaDto : CategoriaDto = new CategoriaDto('','','',0,0);
  selectedTipo: string ='';
  visibleEdadMin :boolean = false;
  visibleEdadMax :boolean = false;
  textoInfo: string = '';

  

  constructor(
    private categoriaService : CategoriaService,
    private location : Location,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.cargarItems();
    this.cargarCategoriaDto('SIN_RESTRICCIONES');
    
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

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/inicio'};
    this.items = [
      {label:'Categorias', routerLink:'/categorias'},
      {label:'Nueva', disabled:true}
    ]
  }

  goBack():void{
    this.location.back();
  }

  crearNuevaCategoria():void{
    const nuevaCategoria : CategoriaDto = {...this.categoriaDto};
    console.log(nuevaCategoria);
    Swal.fire({
      icon:'question',
      title:'¿Crear una nueva Categoria?',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Crear'
    }).then((result) => {
      if(result.isConfirmed){
        this.solicitarCreacionNuevaCategoria(nuevaCategoria);
      }
    })
  }

  solicitarCreacionNuevaCategoria(categoria: CategoriaDto):void{
    this.categoriaService.crearCategoria(categoria).subscribe(
      data => {
        Swal.fire(data.mensaje, 'Te redireccionamos al listado', 'success');
        this.router.navigate(['/categorias']);
      }
      ,
      err =>{
        Swal.fire('Error', err.error.message, 'error');
      }
    )
  }


}
