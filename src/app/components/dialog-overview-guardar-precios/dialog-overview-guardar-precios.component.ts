import { Component } from "@angular/core";
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from "@angular/material/dialog";

@Component({
    selector: 'dialog-overview-guardar-precios',
    templateUrl: './dialog-overview-guardar-precios.component.html',
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
export class DialogOverviewGuardarPrecios {
    constructor(
      public dialogRef: MatDialogRef<DialogOverviewGuardarPrecios>
    ) {}
  
    onAceptarClick(): void {
      this.dialogRef.close();
    }

    addStyleBoton(id: string) {
      let element = document.getElementById(id);
      if (element != null && id === 'aceptar'){
        element.style.backgroundColor = '#F472B6';
      }
    }

    removeStyleBoton(id: string) {
      let element = document.getElementById(id);
      if (element != null && id === 'aceptar'){
        element.style.backgroundColor = '#EC4899';
      }
    }
}