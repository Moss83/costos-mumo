import { Component, Inject, OnInit } from "@angular/core";
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { Ingrediente } from "../../interfaces/ingrediente";

@Component({
    selector: 'dialog-overview-buscar-ingrediente',
    templateUrl: './dialog-overview-buscar-ingrediente.component.html',
    standalone: true,
    imports: [
      MatInputModule,
      MatFormFieldModule,
      MatAutocompleteModule,
      FormsModule,
      ReactiveFormsModule,
      AsyncPipe,
      CommonModule
    ],
})
export class DialogOverviewBuscarIngrediente implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<DialogOverviewBuscarIngrediente>,
        @Inject(MAT_DIALOG_DATA) public data: Ingrediente[],
    ) {}

    puedoAgregar: boolean = false;

    myControlIngrediente = new FormControl<string | Ingrediente>('');

    filteredIngredientes: Observable<Ingrediente[]> = new Observable<Ingrediente[]>;

    ingredientesFiltrados: Ingrediente[] = [];

    ngOnInit(): void {
        this.data.forEach((ing) => this.ingredientesFiltrados.push(Object.assign({}, ing)));
        this.filteredIngredientes = this.myControlIngrediente.valueChanges.pipe(
            startWith(''),
            map(value => {
              const nombre = typeof value === 'string' ? value : value?.nombre;
              return nombre ? this._filterIngredientes(nombre as string) : this.data.slice();
            })
          );
    }

    onCancelarClick(): void {
        this.dialogRef.close();
    }
  
    onAgregarClick(): void {
        this.dialogRef.close(this.myControlIngrediente.value);
    }

    private _filterIngredientes(nombre: string): Ingrediente[] {
        const filterValue = nombre.toLowerCase();
        this.ingredientesFiltrados = this.data.filter(option => option.nombre.toLowerCase().includes(filterValue));
        return this.ingredientesFiltrados;
    }

    displayFnIngrediente(ingrediente: Ingrediente): string {
        return ingrediente && ingrediente.nombre ? ingrediente.nombre : '';
    }

    controlIngrediente() {
        if (typeof this.myControlIngrediente.value === 'object') {
            this.puedoAgregar = true;
        }
        else {
            this.puedoAgregar = false;
        }
        if (this.myControlIngrediente.value?.toString().length === 0){
          this.ingredientesFiltrados = this.data;
        }
    }

    addStyleBoton(id: string) {
        let element = document.getElementById(id);
        if (element != null && id === 'agregar' && this.puedoAgregar){
          element.style.backgroundColor = '#F472B6';
        }
        else if (element != null && id === 'cancelar') {
          element.style.backgroundColor = '#E5E7EB';
        }
      }
  
    removeStyleBoton(id: string) {
        let element = document.getElementById(id);
        if (element != null && id === 'agregar' && this.puedoAgregar){
          element.style.backgroundColor = '#EC4899';
        }
        else if (element != null && id === 'cancelar') {
          element.style.backgroundColor = '#D1D5DB';
        }
      }
}