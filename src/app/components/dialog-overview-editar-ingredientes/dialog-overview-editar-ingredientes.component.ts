import { Component, Inject } from "@angular/core";
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IngredienteEditado } from "../../interfaces/ingrediente-editado";
import { MatCheckboxModule } from '@angular/material/checkbox';


@Component({
    selector: 'dialog-overview-editar-ingredientes',
    templateUrl: './dialog-overview-editar-ingredientes.component.html',
    standalone: true,
    imports: [
      CommonModule,
      MatCheckboxModule
    ],
})

export class DialogOverviewEditarIngredientes {
    constructor(
        public dialogRef: MatDialogRef<DialogOverviewEditarIngredientes>,
        @Inject(MAT_DIALOG_DATA) public data: IngredienteEditado[]
    ) {}

    addStyleIngrediente(id: string) {
        let element = document.getElementById(id);
        if (element != null){
            element.style.backgroundColor = '#E8E8E8';
        }
    }

    removeStyleIngrediente(id: string) {
        let element = document.getElementById(id);
        if (element != null){
            element.style.backgroundColor = '#FFFFFF';
        }
    }

    addStyleBoton(id: string) {
        let element = document.getElementById(id);
        if (element != null && id === 'confirmar'){
            element.style.backgroundColor = '#F472B6';
        }
        else if (element != null && id === 'cancelar') {
            element.style.backgroundColor = '#E5E7EB';
        }
    }

    removeStyleBoton(id: string) {
        let element = document.getElementById(id);
        if (element != null && id === 'confirmar'){
            element.style.backgroundColor = '#EC4899';
        }
        else if (element != null && id === 'cancelar') {
            element.style.backgroundColor = '#D1D5DB';
        }
    }

    onCheckChange(ingrediente: IngredienteEditado): void {
        ingrediente.checked = !ingrediente.checked;
    }

    onAtrasClick(): void {
        this.dialogRef.close();
    }

    onConfirmarClick() {
        this.dialogRef.close(this.data);
    }
}