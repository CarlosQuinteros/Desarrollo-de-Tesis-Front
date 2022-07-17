import { Club } from "../../modelo/club";

export class CompetenciaDto {
    
    idCategoria : number;
    idAsociacionDeportiva : number;
    nombre : string;
    genero: string;
    temporada: string;
    descripcion: string;
    tarjetasAmarillasPermitidas: number;
    clubesParticipantes : Club[];

    constructor(idCategoria : number, idAsociacionDeportiva : number, nombre : string, genero : string, temporada : string, descripcion : string, tarjetasAmarillasPermitidas : number, clubesParticipantes : Club[]){
        this.idCategoria = idCategoria;
        this.idAsociacionDeportiva = idAsociacionDeportiva,
        this.nombre = nombre;
        this.genero = genero;
        this.temporada = temporada;
        this.descripcion = descripcion;
        this.tarjetasAmarillasPermitidas = tarjetasAmarillasPermitidas;
        this.clubesParticipantes = clubesParticipantes;

    }
}
