import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  generosURL : string = environment.generosURL;

  constructor(
    private httpClient: HttpClient,
  ) { }

  public listadoDeGeneros(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.generosURL}/tipos`);
  }
}
