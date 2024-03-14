import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {DomSanitizer} from '@angular/platform-browser';
import { Receta } from '../../interfaces/receta';
import { Ingrediente } from '../../interfaces/ingrediente';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const PLUS_ICON =
  `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#FFFFFF" version="1.1" id="Capa_1" width="600px" height="600px" viewBox="0 0 50 40" xml:space="preserve">
    <g>
      <path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141   c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27   c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435   c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"/>
    </g>
  </svg>
  `;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral('plus-sign', sanitizer.bypassSecurityTrustHtml(PLUS_ICON));
  }

  loading: boolean = true;

  selectedTab: number = 1;

  myControl = new FormControl<string | Receta>('');
  recetas: Receta[] = [];
  ingredientes: Ingrediente[] = [];

  options: Receta[] = [
    {
      nombre: 'Tarta de choclo con tomate',
      rinde_valor: 1,
      rinde_unidad: 'porción',
      idreceta: 1,
      links: []
    },
    {
      nombre: 'Arroz con pollo',
      rinde_valor: 1,
      rinde_unidad: 'porción',
      idreceta: 1,
      links: []
    },
    {
      nombre: 'Espinaca',
      rinde_valor: 1,
      rinde_unidad: 'porción',
      idreceta: 1,
      links: []
    },
    {
      nombre: 'Ravioles de ricota',
      rinde_valor: 1,
      rinde_unidad: 'porción',
      idreceta: 1,
      links: []
    },
    {
      nombre: 'Ravioles de pollo',
      rinde_valor: 1,
      rinde_unidad: 'porción',
      idreceta: 1,
      links: []
    },
    {
      nombre: 'Ensalada de chinchulines',
      rinde_valor: 1,
      rinde_unidad: 'porción',
      idreceta: 1,
      links: []
    },
    {
      nombre: 'Omellete de tripa gorda',
      rinde_valor: 1,
      rinde_unidad: 'porción',
      idreceta: 1,
      links: []
    },
    {
      nombre: 'Omellete de seso',
      rinde_valor: 1,
      rinde_unidad: 'porción',
      idreceta: 1,
      links: []
    },
    {
      nombre: 'Muffins 4 quesos',
      rinde_valor: 1,
      rinde_unidad: 'porción',
      idreceta: 1,
      links: []
    },
    {
      nombre: 'Pan de molde integral con chía',
      rinde_valor: 1,
      rinde_unidad: 'porción',
      idreceta: 1,
      links: []
    },
    {
      nombre: 'Pan de molde blanco',
      rinde_valor: 1,
      rinde_unidad: 'porción',
      idreceta: 1,
      links: []
    },
    {
      nombre: 'Pan de molde dulce de vainilla',
      rinde_valor: 1,
      rinde_unidad: 'porción',
      idreceta: 1,
      links: []
    },
    {
      nombre: 'Budín marmolado',
      rinde_valor: 1,
      rinde_unidad: 'porción',
      idreceta: 1,
      links: []
    }
  ];
  filteredOptions: Observable<Receta[]> = new Observable<Receta[]>;
  recetasFiltradas: Receta[] = this.recetas;
  recetaEscrita: string = '';

  ngOnInit() {
    fetch("https://g851fb2b7286839-mumodatabase.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/recetas/?limit=100")
    .then((response) => response.json())
    .then((r) => {
      this.recetas = r.items;
      this.recetasFiltradas = r.items;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => {
          const nombre = typeof value === 'string' ? value : value?.nombre;
          return nombre ? this._filter(nombre as string) : this.recetas.slice();
        })
      );
    })
    .then(() => {
      fetch("https://g851fb2b7286839-mumodatabase.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/ingredientes/?limit=100")
      .then((response) => response.json())
      .then((r) => {
        this.ingredientes = r.items;
        this.loading = false;
      })
    })
  }

  displayFn(receta: Receta): string {
    return receta && receta.nombre ? receta.nombre : '';
  }

  private _filter(nombre: string): Receta[] {
    const filterValue = nombre.toLowerCase();
    this.recetasFiltradas = this.recetas.filter(option => option.nombre.toLowerCase().includes(filterValue));
    return this.recetasFiltradas;
  }

  changeTab(tab: number) {
    this.selectedTab = tab;
  }

  recetaEscritaVacia() {
    if (this.myControl.value?.toString().length === 0){
      this.recetasFiltradas = this.recetas;
    }
  }

  addStyle(id: string) {
    let element = document.getElementById(id);
    if (element != null){
      element.style.backgroundColor = '#EC4899';
      element.style.color = 'white';
    }
  }

  removeStyle(id: string) {
    let element = document.getElementById(id);
    if (element != null){
      element.style.backgroundColor = '#D1D5DB';
      element.style.color = 'black';
    }
  }
}
