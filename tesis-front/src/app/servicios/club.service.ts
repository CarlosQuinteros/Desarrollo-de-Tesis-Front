import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NuevoClubDto } from '../Dtos/clubes/club-dto';
import { Club } from '../modelo/club';

@Injectable({
  providedIn: 'root'
})
export class ClubService{

  clubURL : string = environment.clubesURL;
  constructor(private httpClient : HttpClient) { }

  public listaClubes():Observable<Club[]> {
    return this.httpClient.get<Club[]>(`${this.clubURL}/listado`);
  }

  public detalleClub(id:number):Observable<any>{
    return this.httpClient.get<any>(`${this.clubURL}/detalle/${id}`);
  }

  public crearClub(club : NuevoClubDto):Observable<any>{
    return this.httpClient.post<any>(`${this.clubURL}/crear`, club);
  }

  public editarClub(club : NuevoClubDto, id:number):Observable<any>{
    return this.httpClient.put<any>(`${this.clubURL}/editar/${id}`, club);
  }

  public eliminarClub(id:number):Observable<any>{
    return this.httpClient.delete<any>(`${this.clubURL}/eliminar/${id}`);
  }

  public cantidadTotalClubes():Observable<number>{
    return this.httpClient.get<number>(`${this.clubURL}/cantidadTotal`);
  }

}
