import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoriaDto } from '../core/Dtos/categorias/categoria-dto';
import { Categoria } from '../core/modelo/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasURL : string = environment.categoriasURL;

  constructor(private httpClient : HttpClient) { }

  public listadoCategorias(): Observable<Categoria[]>{
    return this.httpClient.get<Categoria[]>(`${this.categoriasURL}/listado`);
  }

  public crearCategoria(nuevaCategoria : CategoriaDto):Observable<any>{
    return this.httpClient.post<any>(`${this.categoriasURL}/crear`,nuevaCategoria);
  }

  public editarCategoria(editarCategoria : CategoriaDto, idCategoria : number):Observable<Categoria>{
    return this.httpClient.put<Categoria>(`${this.categoriasURL}/editar/${idCategoria}`, editarCategoria)
  }

  public detalleCategoria(idCategoria : number):Observable<Categoria>{
    return this.httpClient.get<Categoria>(`${this.categoriasURL}/detalle/${idCategoria}`);
  }

  public eliminarCategoria(idCategoria : number):Observable<any>{
    return this.httpClient.delete<any>(`${this.categoriasURL}/eliminar/${idCategoria}`);
  }

  public cantidadTotalCategorias():Observable<number>{
    return this.httpClient.get<number>(`${this.categoriasURL}/cantidad-total`);
  }

}
