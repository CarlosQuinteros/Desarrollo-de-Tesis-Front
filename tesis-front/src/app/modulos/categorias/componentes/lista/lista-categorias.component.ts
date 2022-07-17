import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Categoria } from 'src/app/core/modelo/categoria';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.css']
})
export class ListaCategoriasComponent implements OnInit {

  categorias : Categoria[] = [];
  loading : boolean = true;

  constructor(
    private categoriaService: CategoriaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.categoriaService.listadoCategorias().subscribe(
      data => {
        this.categorias = data;
        this.loading = false;
      }
    )
  }

  claseSpanPorTipoCategoria(categoria : Categoria) : string{
    const clasesCss : {[key: string]: string}= {
      SIN_RESTRICCIONES:'w-min p-tag bg-green-200 text-green-800 text-center',
      HASTA_EDAD:'w-min p-tag bg-blue-200 text-blue-800 text-center',
      DESDE_EDAD:'w-min p-tag bg-orange-200 text-orange-800 text-center',
      ENTRE_EDADES:'w-min p-tag bg-pink-200 text-pink-800 text-center',
    }
    return clasesCss[categoria.tipo];

  }

  clear(table : Table){
    table.clear();
  }

  eliminarCategoria(id: number){
    Swal.fire({
      title:'¿Realmente deseas eliminar la categoria?',
      text: 'No se eliminará si tiene transacciones con torneos',
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText:'Eliminar'
    }).then((result) => {
      if(result.isConfirmed){
        this.solicitarEliminacionCategoria(id);
      }
    })
  }

  solicitarEliminacionCategoria(id: number){
    this.categoriaService.eliminarCategoria(id).toPromise().then(
      data => {
        Swal.fire(data.mensaje, '', 'success');
        this.cargarCategorias();
      },
      err => {
        Swal.fire('Error', err.error.message, 'error')
      }
    )
  }

}
