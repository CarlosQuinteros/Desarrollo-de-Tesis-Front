export class CategoriaDto {
    nombre: string;
    descripcion: string;
    tipo: string;
    edadMinima: number;
    edadMaxima: number;

    constructor(nombre: string, descripcion: string,tipo:string, edadMinima: number, edadMaxima: number){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.edadMinima = edadMinima;
        this.edadMaxima = edadMaxima;
        this.tipo = tipo;
    }
}
