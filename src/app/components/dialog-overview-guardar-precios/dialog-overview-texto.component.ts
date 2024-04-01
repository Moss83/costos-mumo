import { Component, Inject } from "@angular/core";
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'dialog-overview-texto',
    templateUrl: './dialog-overview-texto.component.html',
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
export class DialogOverviewTexto {
    constructor(
      public dialogRef: MatDialogRef<DialogOverviewTexto>,
      @Inject(MAT_DIALOG_DATA) public data: string
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