export class Categoria {
    id: number;
    nombre: string;
    descripcion: string;
    tipo:string;
    edadMinima: number;
    edadMaxima: number;

    constructor(id: number, nombre: string, descripcion: string, tipo:string, edadMinima: number, edadMaxima: number){
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.edadMinima = edadMinima;
        this.edadMaxima = edadMaxima;
        this.tipo = tipo;
    }
}
