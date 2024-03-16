import { Component } from "@angular/core";
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from "@angular/material/dialog";
import { Ingrediente } from "../../interfaces/ingrediente";

@Component({
    selector: 'dialog-overview-dialog-ingrediente',
    templateUrl: './dialog-overview-dialog-ingrediente.component.html',
    standalone: true,
    imports: [
      MatDialogTitle,
      MatDialogContent,
      MatDialogActions,
      MatDialogClose,
      AsyncPipe,
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
      unidadmedida: 'Kg'
    };
  
    onCancelarClick(): void {
      this.dialogRef.close();
    }

    onAgregarClick(): void {
      this.dialogRef.close(this.nuevoIngrediente);
    }

    cambiarPrecioIngrediente(event: Event) {
      let nuevoPrecio = parseFloat((event.target as HTMLInputElement).value);
      if (!Number.isNaN(nuevoPrecio)){
        this.nuevoIngrediente.precio = nuevoPrecio;
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
        this.nuevoIngrediente.nombre = (event.target as HTMLInputElement).value;
      }
    }

    cambiarUnidadMedidaIngrediente(event: Event) {
      let nuevaUnidadMedida = (event.target as HTMLInputElement).value;
      this.nuevoIngrediente.unidadmedida = nuevaUnidadMedida;
    }
}