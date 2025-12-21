export interface IngredienteEditado {
    idingrediente: number;
    nombre: string;
    precioAnterior: number;
    precioActual: number;
    unidadmedida: string;
    es_receta: number;
    idreceta: number;
    checked: boolean;
}