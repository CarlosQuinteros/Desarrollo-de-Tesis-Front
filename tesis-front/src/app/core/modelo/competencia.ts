import { AsociacionDeportiva } from './asociacion-deportiva';
import { Categoria } from './categoria';
import { Club } from './club';

export class Competencia {
  id: number;
  asociacionDeportiva: AsociacionDeportiva;
  categoria: Categoria;
  genero: string;
  nombre: string;
  temporada: string;
  descripcion: string;
  tarjetasAmarillasPermitidas: number;
  clubesParticipantes: Club[];

  constructor(
    id: number,
    asociacionDeportiva: AsociacionDeportiva,
    categoria: Categoria,
    genero: string,
    nombre: string,
    temporada: string,
    descripcion: string,
    tarjetasAmarillasPermitidas: number,
    clubesParticipantes: Club[]
  ) {
    this.id = id;
    this.asociacionDeportiva = asociacionDeportiva;
    this.categoria = categoria;
    this.genero = genero;
    this.nombre = nombre;
    this.temporada = temporada;
    this.descripcion = descripcion;
    this.tarjetasAmarillasPermitidas = tarjetasAmarillasPermitidas;
    this.clubesParticipantes = clubesParticipantes;
  }
}
