import { Component } from "@angular/core";
import { CommonModule } from '@angular/common';
import { MatDialogRef } from "@angular/material/dialog";
import { Ingrediente } from "../../interfaces/ingrediente";

@Component({
    selector: 'dialog-overview-dialog-ingrediente',
    templateUrl: './dialog-overview-dialog-ingrediente.component.html',
    standalone: true,
    imports: [
      CommonModule
    ],
})
export class DialogOverviewDialogIngrediente {
    constructor(
      public dialogRef: MatDialogRef<DialogOverviewDialogIngrediente>
    ) {}

    nuevoIngrediente: Ingrediente = {
      nombre: 'Introducir nombre',
      idingrediente: 0,
      precio: 0,
      unidadmedida: 'Kg',
      es_receta: 0,
      idreceta: 0
    };
  
    onCancelarClick(): void {
      this.dialogRef.close();
    }

    onAgregarClick(): void {
      this.dialogRef.close(this.nuevoIngrediente);
    }

    cambiarPrecioIngrediente(event: Event) {
      let nuevoPrecio = (event.target as HTMLInputElement).value;
      nuevoPrecio = nuevoPrecio.replaceAll(",", "");
      if (!Number.isNaN(+nuevoPrecio) && parseFloat(nuevoPrecio) > 0){
        this.nuevoIngrediente.precio = parseFloat(nuevoPrecio);
      }
      else {
        (event.target as HTMLInputElement).value = '0.00';
      }
    }

    cambiarNombreIngrediente(event: Event) {
      let nuevoNombre = (event.target as HTMLInputElement).value;
      if (nuevoNombre === '') {
        this.nuevoIngrediente.nombre = 'Introducir nombre';
      }
      else {
        this.nuevoIngrediente.nombre = nuevoNombre;
      }
    }

    cambiarUnidadMedidaIngrediente(event: Event) {
      let nuevaUnidadMedida = (event.target as HTMLInputElement).value;
      this.nuevoIngrediente.unidadmedida = nuevaUnidadMedida;
    }

    addStyleBoton(id: string) {
      let element = document.getElementById(id);
      if (element != null && id === 'agregar'){
        element.style.backgroundColor = '#F472B6';
      }
      else if (element != null && id === 'cancelar') {
        element.style.backgroundColor = '#E5E7EB';
      }
    }

    removeStyleBoton(id: string) {
      let element = document.getElementById(id);
      if (element != null && id === 'agregar'){
        element.style.backgroundColor = '#EC4899';
      }
      else if (element != null && id === 'cancelar') {
        element.style.backgroundColor = '#D1D5DB';
      }
    }

    
}