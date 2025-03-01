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
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {DomSanitizer} from '@angular/platform-browser';
import { Receta } from '../../interfaces/receta';
import { Ingrediente } from '../../interfaces/ingrediente';
import { IngredienteReceta } from '../../interfaces/ingrediente-receta';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DialogOverviewDialogIngrediente } from '../dialog-overview-dialog/dialog-overview-dialog-ingrediente.component';
import { DialogOverviewTexto } from '../dialog-overview-guardar-precios/dialog-overview-texto.component';
import { Pantallas } from '../enums/pantallas-enum';
import { IngredienteRecetaView } from '../../interfaces/ingrediente-receta-view';
import { IngredienteRecetaCreate } from '../../interfaces/ingrediente-receta-create';
import { MatMenuModule } from '@angular/material/menu';
import { DialogOverviewBuscarIngrediente } from '../dialog-overview-buscar-ingrediente/dialog-overview-buscar-ingrediente.component';

const PLUS_ICON =
  `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#FFFFFF" version="1.1" id="Capa_1" width="600px" height="600px" viewBox="0 0 50 40" xml:space="preserve">
    <g>
      <path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141   c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27   c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435   c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"/>
    </g>
  </svg>
  `;

  const PLUS_GRAY_ICON =
  `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#374151" version="1.1" id="Capa_1" width="600px" height="600px" viewBox="0 0 50 40" xml:space="preserve">
    <g>
      <path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141   c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27   c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435   c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"/>
    </g>
  </svg>
  `;

const CHEF_HAT_ICON =
  `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" viewBox="0 0 512 512" xml:space="preserve">
    <g>
      <g>
        <path d="M460.997,136.41c-18.458-18.851-42.304-30.656-68.127-33.936C375.286,42.435,319.529,0,256,0    c-63.528,0-119.284,42.435-136.869,102.474c-25.824,3.28-49.67,15.085-68.128,33.936c-21.354,21.808-33.114,50.632-33.114,81.159    c0,59.613,41.685,107.395,97.427,115.005V512h281.369V332.575c55.742-7.611,97.426-55.393,97.426-115.005    C494.111,187.042,482.351,158.218,460.997,136.41z M365.338,480.653H146.663v-50.425h218.675V480.653z M381.012,302.286h-15.673    v96.596h-38.807v-64.514h-31.347v64.514h-23.51v-64.514h-31.347v64.514h-23.51v-64.514h-31.347v64.514h-38.807v-96.596h-15.673    c-45.844,0-81.754-37.212-81.754-84.716c0-45.635,37.115-83.614,82.735-84.661l12.514-0.287l2.488-12.267    C157.432,68.78,203.285,31.347,256,31.347c52.367,0,97.945,36.946,108.799,87.991c0.226,7.129-0.122,47.282-35.695,56.697    l8.021,30.303c26.557-7.03,45.206-25.178,53.93-52.483c2.202-6.89,3.475-13.473,4.203-19.168    c38.368,8.055,67.507,42.452,67.507,82.882C462.764,265.074,426.854,302.286,381.012,302.286z"/>
      </g>
    </g>
  </svg>
  `;

const UNDO_ICON = 
  `
  <svg width="31" height="29" viewBox="0 0 31 29" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.38603 28.0738C6.84029 28.0738 6.3825 27.8889 6.01268 27.5191C5.64414 27.1506 5.45987 26.6934 5.45987 26.1477C5.45987 25.6019 5.64414 25.1448 6.01268 24.7762C6.3825 24.4064 6.84029 24.2215 7.38603 24.2215H19.1356C21.1581 24.2215 22.9154 23.5795 24.4075 22.2953C25.901 21.0112 26.6477 19.4061 26.6477 17.4799C26.6477 15.5538 25.901 13.9486 24.4075 12.6645C22.9154 11.3804 21.1581 10.7384 19.1356 10.7384H7.0008L10.6605 14.3981C11.0136 14.7512 11.1902 15.2006 11.1902 15.7464C11.1902 16.2921 11.0136 16.7416 10.6605 17.0947C10.3074 17.4478 9.85795 17.6244 9.3122 17.6244C8.76645 17.6244 8.31701 17.4478 7.96388 17.0947L1.02969 10.1605C0.837078 9.9679 0.700321 9.75923 0.619422 9.53451C0.539807 9.30979 0.5 9.06902 0.5 8.8122C0.5 8.55538 0.539807 8.31461 0.619422 8.08989C0.700321 7.86517 0.837078 7.6565 1.02969 7.46388L7.96388 0.529694C8.31701 0.176564 8.76645 0 9.3122 0C9.85795 0 10.3074 0.176564 10.6605 0.529694C11.0136 0.882824 11.1902 1.33226 11.1902 1.87801C11.1902 2.42376 11.0136 2.87319 10.6605 3.22632L7.0008 6.88603H19.1356C22.2496 6.88603 24.9225 7.89727 27.1543 9.91974C29.3848 11.9422 30.5 14.4623 30.5 17.4799C30.5 20.4976 29.3848 23.0177 27.1543 25.0401C24.9225 27.0626 22.2496 28.0738 19.1356 28.0738H7.38603Z" fill="white"/>
  </svg>

  `;
const ENTER_ICON =
  `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="0 -6.5 38 38" version="1.1">
    <g id="icons" stroke="none" stroke-width="2" fill="none" fill-rule="evenodd">
        <g id="ui-gambling-website-lined-icnos-casinoshunter" transform="translate(-1511.000000, -158.000000)" fill="#1C1C1F" fill-rule="nonzero">
            <g id="1" transform="translate(1350.000000, 120.000000)">
                <path d="M187.812138,38.5802109 L198.325224,49.0042713 L198.41312,49.0858421 C198.764883,49.4346574 198.96954,49.8946897 199,50.4382227 L198.998248,50.6209428 C198.97273,51.0514917 198.80819,51.4628128 198.48394,51.8313977 L198.36126,51.9580208 L187.812138,62.4197891 C187.031988,63.1934036 185.770571,63.1934036 184.990421,62.4197891 C184.205605,61.6415481 184.205605,60.3762573 184.990358,59.5980789 L192.274264,52.3739093 L162.99947,52.3746291 C161.897068,52.3746291 161,51.4850764 161,50.3835318 C161,49.2819872 161.897068,48.3924345 162.999445,48.3924345 L192.039203,48.3917152 L184.990421,41.4019837 C184.205605,40.6237427 184.205605,39.3584519 184.990421,38.5802109 C185.770571,37.8065964 187.031988,37.8065964 187.812138,38.5802109 Z" id="right-arrow" fill="white"/>
            </g>
        </g>
    </g>
  </svg>
  `;

const TRASH_ICON = 
  `
  <svg width="27" height="36" viewBox="0 0 27 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.8771 0.224487C9.70881 0.224487 8.74591 1.17239 8.74591 2.32245V3.72109H3.19604C3.10725 3.7047 3.01845 3.7047 2.92965 3.72109H1.64208C1.61988 3.72109 1.59768 3.72109 1.57548 3.72109C1.18422 3.74021 0.878975 4.06801 0.8984 4.45319C0.917825 4.83836 1.25082 5.13885 1.64208 5.11972H2.41906L4.972 33.4422C5.0608 34.4201 5.90715 35.1905 6.90335 35.1905H20.5338C21.53 35.1905 22.3764 34.4201 22.4652 33.4422L25.0181 5.11972H25.7951C26.0504 5.12246 26.289 4.99133 26.4194 4.7728C26.5471 4.55426 26.5471 4.28655 26.4194 4.06801C26.289 3.84948 26.0504 3.71835 25.7951 3.72109H18.6913V2.32245C18.6913 1.17239 17.7284 0.224487 16.5601 0.224487H10.8771ZM10.8771 1.62313H16.5601C16.9597 1.62313 17.2705 1.92908 17.2705 2.32245V3.72109H10.1667V2.32245C10.1667 1.92908 10.4775 1.62313 10.8771 1.62313ZM3.83983 5.11972H23.5973L21.0444 33.3329C21.0222 33.576 20.7586 33.7918 20.5338 33.7918H6.90335C6.67858 33.7918 6.41496 33.576 6.39277 33.3329L3.83983 5.11972ZM9.38969 7.19583C9.35917 7.20129 9.32864 7.20949 9.30089 7.21768C8.97068 7.29144 8.73758 7.58373 8.74591 7.917V30.9946C8.74313 31.2459 8.87633 31.4808 9.09832 31.6092C9.32032 31.7348 9.59226 31.7348 9.81426 31.6092C10.0363 31.4808 10.1694 31.2459 10.1667 30.9946V7.917C10.175 7.71486 10.0917 7.52091 9.94468 7.38432C9.79483 7.245 9.59226 7.17671 9.38969 7.19583ZM13.652 7.19583C13.6215 7.20129 13.5909 7.20949 13.5632 7.21768C13.233 7.29144 12.9999 7.58373 13.0082 7.917V30.9946C13.0054 31.2459 13.1386 31.4808 13.3606 31.6092C13.5826 31.7348 13.8546 31.7348 14.0766 31.6092C14.2985 31.4808 14.4317 31.2459 14.429 30.9946V7.917C14.4373 7.71486 14.354 7.52091 14.207 7.38432C14.0571 7.245 13.8546 7.17671 13.652 7.19583ZM17.9143 7.19583C17.8838 7.20129 17.8532 7.20949 17.8255 7.21768C17.4953 7.29144 17.2622 7.58373 17.2705 7.917V30.9946C17.2677 31.2459 17.4009 31.4808 17.6229 31.6092C17.8449 31.7348 18.1169 31.7348 18.3388 31.6092C18.5608 31.4808 18.694 31.2459 18.6913 30.9946V7.917C18.6996 7.71486 18.6163 7.52091 18.4693 7.38432C18.3194 7.245 18.1169 7.17671 17.9143 7.19583Z" fill="#E91E63"/>
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
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public dialog: MatDialog) {
    iconRegistry.addSvgIconLiteral('plus-sign', sanitizer.bypassSecurityTrustHtml(PLUS_ICON));
    iconRegistry.addSvgIconLiteral('plus-sign-gray', sanitizer.bypassSecurityTrustHtml(PLUS_GRAY_ICON));
    iconRegistry.addSvgIconLiteral('chef-hat', sanitizer.bypassSecurityTrustHtml(CHEF_HAT_ICON));
    iconRegistry.addSvgIconLiteral('undo', sanitizer.bypassSecurityTrustHtml(UNDO_ICON));
    iconRegistry.addSvgIconLiteral('enter', sanitizer.bypassSecurityTrustHtml(ENTER_ICON));
    iconRegistry.addSvgIconLiteral('trash', sanitizer.bypassSecurityTrustHtml(TRASH_ICON));
  }

  loading: boolean = true;

  pantalla: Pantallas = Pantallas.HOME;

  selectedTab: Pantallas = Pantallas.RECETAS;

  botonesDisabled: boolean = true;

  myControlReceta = new FormControl<string | Receta>('');
  myControlPreparacion = new FormControl<string | Receta>('');
  myControlIngrediente = new FormControl<string | Ingrediente>('');
  recetas: Receta[] = [];
  preparaciones: Receta[] = [];
  ingredientes: Ingrediente[] = [];
  ingredientesRecetas: IngredienteReceta[] = [];

  filteredRecetas: Observable<Receta[]> = new Observable<Receta[]>;
  filteredPreparaciones: Observable<Receta[]> = new Observable<Receta[]>;
  filteredIngredientes: Observable<Ingrediente[]> = new Observable<Ingrediente[]>;
  recetasFiltradas: Receta[] = [];
  preparacionesFiltradas: Receta[] = [];
  ingredientesFiltrados: Ingrediente[] = [];
  ingredientesOriginal: Ingrediente[] = [];

  selectedReceta: Receta = {
    idreceta: 0,
    nombre: '',
    costo: 0,
    rinde_unidad: '',
    rinde_valor: 0,
    es_ingrediente: 0
  };

  ingredientesSelectedReceta: IngredienteRecetaView[] = [];

  ingredientesSelectedRecetaOriginal: IngredienteRecetaView[] = [];

  cantidadOriginal: number = 0;

  cantidadSeleccionada: number = 0;

  costoOriginal: number = 0;

  newReceta: Receta = {
    idreceta: 0,
    nombre: 'Introducir nombre',
    costo: 0,
    rinde_unidad: 'gramos',
    rinde_valor: 1,
    es_ingrediente: 0
  };

  newRecetaIngredientes: IngredienteRecetaCreate[] = [];

  newRecetaIngredientesOriginales: IngredienteRecetaCreate[] = [];

  modoVista: string = '';

  ngOnInit() {
    fetch("https://g851fb2b7286839-mumodatabase.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/recetas/?limit=1000&q={\"$orderby\":{\"nombre\": \"asc\"}}")
    .then((response) => response.json())
    .catch((e) => console.error(e))
    .then((r) => {
      this.recetas = [];
      this.preparaciones = [];
      let receprepas = r.items;
      receprepas.forEach((receprepa: Receta) => {
        if (receprepa.es_ingrediente === 0){
            this.recetas.push(receprepa);
        }
        else {
            this.preparaciones.push(receprepa);
        }
      });
    })
    .then(() => {
      fetch("https://g851fb2b7286839-mumodatabase.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/ingredientes/?limit=1000&q={\"$orderby\":{\"nombre\": \"asc\"}}")
      .then((response) => response.json())
      .catch((e) => console.error(e))
      .then((r) => {
        this.ingredientes = r.items;
      })
      .then(() => {
        fetch("https://g851fb2b7286839-mumodatabase.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/ingredientesreceta/?limit=1000&q={\"$orderby\":{\"idreceta\": \"asc\"}}")
        .then((response) => response.json())
        .catch((e) => console.error(e))
        .then((r) => {
          this.ingredientesRecetas = r.items;

          this.calcularCostosRecetas();
          this.calcularCostosPreparaciones();

          this.ingredientes.forEach((ing) => this.ingredientesOriginal.push(Object.assign({}, ing)));
          this.ingredientes.forEach((ing) => this.ingredientesFiltrados.push(Object.assign({}, ing)));
          this.filteredRecetas = this.myControlReceta.valueChanges.pipe(
            startWith(''),
            map(value => {
              const nombre = typeof value === 'string' ? value : value?.nombre;
              return nombre ? this._filterRecetas(nombre as string) : this.recetas.slice();
            })
          );
          this.filteredPreparaciones = this.myControlPreparacion.valueChanges.pipe(
            startWith(''),
            map(value => {
              const nombre = typeof value === 'string' ? value : value?.nombre;
              return nombre ? this._filterPreparaciones(nombre as string) : this.preparaciones.slice();
            })
          );
          this.filteredIngredientes = this.myControlIngrediente.valueChanges.pipe(
            startWith(''),
            map(value => {
              const nombre = typeof value === 'string' ? value : value?.nombre;
              return nombre ? this._filterIngredientes(nombre as string) : this.ingredientes.slice();
            })
          );
          this.loading = false;
        })
      })
    });
  }

  pantallas() {
    return Pantallas;
  }

  displayFnReceta(receta: Receta): string {
    return receta && receta.nombre ? receta.nombre : '';
  }

  displayFnPreparacion(preparacion: Receta): string {
    return preparacion && preparacion.nombre ? preparacion.nombre : '';
  }

  displayFnIngrediente(ingrediente: Ingrediente): string {
    return ingrediente && ingrediente.nombre ? ingrediente.nombre : '';
  }

  private _filterRecetas(nombre: string): Receta[] {
    const filterValue = nombre.toLowerCase();
    this.recetasFiltradas = this.recetas.filter(option => option.nombre.toLowerCase().includes(filterValue));
    return this.recetasFiltradas;
  }

  private _filterPreparaciones(nombre: string): Receta[] {
    const filterValue = nombre.toLowerCase();
    this.preparacionesFiltradas = this.preparaciones.filter(option => option.nombre.toLowerCase().includes(filterValue));
    return this.preparacionesFiltradas;
  }

  private _filterIngredientes(nombre: string): Ingrediente[] {
    const filterValue = nombre.toLowerCase();
    this.ingredientesFiltrados = this.ingredientes.filter(option => option.nombre.toLowerCase().includes(filterValue));
    return this.ingredientesFiltrados;
  }

  calcularCostosRecetas() {
    for (let receta of this.recetas) {
      let costo: number = 0;
      let ingredientesEnReceta = this.ingredientesRecetas.filter((registro) => registro.idreceta === receta.idreceta);
      for (let ingrediente of ingredientesEnReceta) {
        let ingrBase = this.ingredientes.find((ing) => ing.idingrediente === ingrediente.idingrediente);
        if (ingrBase?.unidadmedida === ingrediente.unidadcantidad) {
          costo += ingrediente.cantidad * ingrBase.precio;
        }
        else if ((ingrBase?.unidadmedida === 'Kg' || ingrBase?.unidadmedida === 'Lt') && (ingrediente.unidadcantidad === 'gr' || ingrediente.unidadcantidad === 'ml')){
          costo += ingrediente.cantidad * ingrBase.precio / 1000;
        }
      }
      receta.costo = parseFloat(costo.toFixed(2));
    }
    this.recetasFiltradas = [];
    this.recetas.forEach((rec) => this.recetasFiltradas.push(Object.assign({}, rec)));
  }

  calcularCostosPreparaciones() {
    for (let preparacion of this.preparaciones) {
      let costo: number = 0;
      let ingredientesEnReceta = this.ingredientesRecetas.filter((registro) => registro.idreceta === preparacion.idreceta);
      for (let ingrediente of ingredientesEnReceta) {
        let ingrBase = this.ingredientes.find((ing) => ing.idingrediente === ingrediente.idingrediente);
        if (ingrBase?.unidadmedida === ingrediente.unidadcantidad) {
          costo += ingrediente.cantidad * ingrBase.precio;
        }
        else if ((ingrBase?.unidadmedida === 'Kg' || ingrBase?.unidadmedida === 'Lt') && (ingrediente.unidadcantidad === 'gr' || ingrediente.unidadcantidad === 'ml')){
          costo += ingrediente.cantidad * ingrBase.precio / 1000;
        }
      }
      preparacion.costo = parseFloat(costo.toFixed(2));
    }
    this.preparacionesFiltradas = [];
    this.preparaciones.forEach((prep) => this.preparacionesFiltradas.push(Object.assign({}, prep)));
  }

  changeTab(tab: Pantallas) {
    this.selectedTab = tab;
  }

  recetaEscritaVacia() {
    if (this.myControlReceta.value?.toString().length === 0){
      this.recetasFiltradas = this.recetas;
    }
  }

  preparacionEscritaVacia() {
    if (this.myControlPreparacion.value?.toString().length === 0){
      this.preparacionesFiltradas = this.preparaciones;
    }
  }

  ingredienteEscritoVacio() {
    if (this.myControlIngrediente.value?.toString().length === 0){
      this.ingredientesFiltrados = this.ingredientes;
    }
  }

  addStyleReceta(id: string) {
    let element = document.getElementById(id);
    if (element != null){
      element.style.backgroundColor = '#EC4899';
      element.style.color = 'white';
    }
  }

  removeStyleReceta(id: string) {
    let element = document.getElementById(id);
    if (element != null){
      element.style.backgroundColor = '#D1D5DB';
      element.style.color = 'black';
    }
  }

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

  addStyleBotonNuevo(id: string) {
    let element = document.getElementById(id);
    if (element != null){
      element.style.backgroundColor = '#F472B6';
    }
  }

  removeStyleBotonNuevo(id: string) {
    let element = document.getElementById(id);
    if (element != null){
      element.style.backgroundColor = '#EC4899';
    }
  }

  addStyleBotonesIngrediente(id: string) {
    if (!this.botonesDisabled){
      let element = document.getElementById(id);
      if (element != null && id === 'guardar'){
        element.style.backgroundColor = '#F472B6';
      }
      else if (element != null && id === 'reestablecer') {
        element.style.backgroundColor = '#E5E7EB';
      }
    }
  }

  removeStyleBotonesIngrediente(id: string) {
    if (!this.botonesDisabled){
      let element = document.getElementById(id);
      if (element != null && id === 'guardar'){
        element.style.backgroundColor = '#EC4899';
      }
      else if (element != null && id === 'reestablecer') {
        element.style.backgroundColor = '#D1D5DB';
      }
    }
  }

  addStyleBotonesVerReceta(id: string) {
    let element = document.getElementById(id);
    if (element != null && (id === 'editar' || id === 'undo' || id === 'enter' || id === 'crear')){
      element.style.backgroundColor = '#F472B6';
    }
    else if (element != null && id === 'atras') {
      element.style.backgroundColor = '#E5E7EB';
    }
  }

  removeStyleBotonesVerReceta(id: string) {
    let element = document.getElementById(id);
    if (element != null && (id === 'editar' || id === 'undo' || id === 'enter' || id === 'crear')){
      element.style.backgroundColor = '#EC4899';
    }
    else if (element != null && id === 'atras') {
      element.style.backgroundColor = '#D1D5DB';
    }
  }

  cambiarPrecioIngrediente(ingrediente: Ingrediente, event: Event) {
    let nuevoPrecio = (event.target as HTMLInputElement).value;
    nuevoPrecio = nuevoPrecio.replaceAll(",", "");
    if (!Number.isNaN(+nuevoPrecio) && parseFloat(nuevoPrecio) > 0){
      ingrediente.precio = parseFloat(nuevoPrecio);
      this.ingredientesFiltrados[this.ingredientesFiltrados.findIndex((ing) => ing.idingrediente === ingrediente.idingrediente)] = ingrediente;
      this.ingredientes[this.ingredientes.findIndex((ing) => ing.idingrediente === ingrediente.idingrediente)] = ingrediente;
      this.botonesDisabled = false;
    }
    else {
      (event.target as HTMLInputElement).value = this.ingredientesOriginal[this.ingredientesOriginal.findIndex((ing) => ing.idingrediente === ingrediente.idingrediente)].precio.toString();
    }
  }

  reestablecerPrecios() {
    this.ingredientesFiltrados.forEach((ing) => ing.precio = this.ingredientesOriginal[this.ingredientesOriginal.findIndex((ingr) => ingr.idingrediente === ing.idingrediente)].precio);
    this.ingredientes.forEach((ing) => ing.precio = this.ingredientesOriginal[this.ingredientesOriginal.findIndex((ingr) => ingr.idingrediente === ing.idingrediente)].precio);
    this.botonesDisabled = true;
  }

  async guardarPrecios() {
    this.loading = true;
    for (let ingrediente of this.ingredientes) {
      if (ingrediente.precio !== this.ingredientesOriginal[this.ingredientesOriginal.findIndex((ing) => ing.idingrediente === ingrediente.idingrediente)].precio) {
        let sendIngrediente = {
          nombre: ingrediente.nombre,
          unidadmedida: ingrediente.unidadmedida,
          precio: ingrediente.precio,
          es_receta: ingrediente.es_receta
        };
        await fetch("https://g851fb2b7286839-mumodatabase.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/ingredientes/" + ingrediente.idingrediente.toString(), {
          method: "PUT",
          body: JSON.stringify(sendIngrediente),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .catch((e) => console.error(e))
        .then(() => {
          this.ingredientesOriginal[this.ingredientesOriginal.findIndex((ing) => ing.idingrediente === ingrediente.idingrediente)].precio = ingrediente.precio;
          this.ingredientes[this.ingredientes.findIndex((ing) => ing.idingrediente === ingrediente.idingrediente)].precio = ingrediente.precio;
        })
      }
    }
    this.botonesDisabled = true;
    this.calcularCostosRecetas();
    this.calcularCostosPreparaciones();
    this.loading = false;
    this.openDialogGuardarPrecios();
  }

  openDialogIngrediente(): void {
    const dialogRef = this.dialog.open(DialogOverviewDialogIngrediente);

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        let sendIngrediente = {
          nombre: result.nombre[0].toUpperCase() + result.nombre.substr(1).toLowerCase(),
          unidadmedida: result.unidadmedida,
          precio: result.precio,
          es_receta: 0
        }

        fetch("https://g851fb2b7286839-mumodatabase.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/ingredientes/", {
          method: "POST",
          body: JSON.stringify(sendIngrediente),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .catch((e) => console.error(e))
        .then(() => {
          fetch("https://g851fb2b7286839-mumodatabase.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/ingredientes/?limit=1000&q={\"$orderby\":{\"nombre\": \"asc\"}}")
          .then((response) => response.json())
          .catch((e) => console.error(e))
          .then((r) => {
            this.ingredientes = r.items;
            this.ingredientesOriginal = [];
            this.ingredientesFiltrados = [];
            this.ingredientes.forEach((ing) => this.ingredientesOriginal.push(Object.assign({}, ing)));
            this.ingredientes.forEach((ing) => this.ingredientesFiltrados.push(Object.assign({}, ing)));
            this.filteredIngredientes = this.myControlIngrediente.valueChanges.pipe(
              startWith(''),
              map(value => {
                const nombre = typeof value === 'string' ? value : value?.nombre;
                return nombre ? this._filterIngredientes(nombre as string) : this.ingredientes.slice();
              })
            );
          })
        })
      }
    });
  }

  openDialogGuardarPrecios(): void {
    const dialogRef = this.dialog.open(DialogOverviewTexto, {data: 'Precios guardados exitosamente'});

    dialogRef.afterClosed().subscribe(() => {
        this.homeFromNuevaReceta(true);
    });
  }

  verReceta(receta: Receta): void {
    this.selectedReceta = receta;
    this.costoOriginal = receta.costo;
    this.cantidadOriginal = receta.rinde_valor;
    this.cantidadSeleccionada = receta.rinde_valor;
    this.ingredientesSelectedReceta = [];
    this.ingredientesSelectedRecetaOriginal = [];
    let ingrSelectedReceta = this.ingredientesRecetas.filter(ing => ing.idreceta === this.selectedReceta.idreceta);
    ingrSelectedReceta.forEach(ing => {
      let ingOriginal = this.ingredientes.find(ingr => ingr.idingrediente === ing.idingrediente)!;
      let ingView: IngredienteRecetaView = {
        idingredientereceta: ing.idingredientereceta,
        idingrediente: ing.idingrediente,
        nombre: ingOriginal.nombre,
        cantidad: ing.cantidad,
        unidad: ing.unidadcantidad,
        precio: (ingOriginal.unidadmedida === 'Un') ? ing.cantidad * ingOriginal.precio : ingOriginal.precio / 1000 * ing.cantidad
      }
      this.ingredientesSelectedReceta.push(ingView);
    });
    this.ordenarIngredientesReceta();
    this.ingredientesSelectedReceta.forEach((ing) => this.ingredientesSelectedRecetaOriginal.push(Object.assign({}, ing)));
    this.pantalla = Pantallas.VER_RECETA;
  }

  cambiarCantidadReceta(event: Event) {
    let nuevaCantidad = (event.target as HTMLInputElement).value;
    nuevaCantidad = nuevaCantidad.replaceAll(",", "");
    if (!Number.isNaN(+nuevaCantidad) && Number.isInteger(+nuevaCantidad) && parseInt(nuevaCantidad) > 0){
      this.selectedReceta.rinde_valor = parseInt(nuevaCantidad);
      this.cantidadSeleccionada = parseInt(nuevaCantidad);
    }
    else {
      (event.target as HTMLInputElement).value = this.cantidadSeleccionada.toString();
    }
  }

  resetCantidad() {
    this.selectedReceta.rinde_valor = this.cantidadOriginal;
    this.cantidadSeleccionada = this.cantidadOriginal;
    this.calcularConversion();
  }

  calcularConversion() {
    let costoTotal: number = 0;
    this.ingredientesSelectedRecetaOriginal.forEach(ing => {
      let ingr = this.ingredientesSelectedReceta.find(miIngrediente => miIngrediente.idingrediente === ing.idingrediente)!;
      ingr.cantidad = parseInt((this.cantidadSeleccionada * ing.cantidad / this.cantidadOriginal).toFixed(0));
      ingr.precio = ingr.cantidad * ing.precio / ing.cantidad;
      costoTotal += ingr.precio;
    });
    this.selectedReceta.costo = costoTotal;
  }

  homeFromVerReceta() {
    this.resetCantidad();
    this.pantalla = Pantallas.HOME;
    this.selectedTab = Pantallas.RECETAS;
  }

  nuevaReceta(receta: Receta, ingredientes: IngredienteRecetaView[], modo: string) {
    if (modo === 'NuevaR' || modo === 'NuevaP') {
      this.newReceta = {
          idreceta: 0,
          nombre: 'Introducir nombre',
          costo: 0,
          rinde_unidad: 'gramos',
          rinde_valor: 1,
          es_ingrediente: modo === 'NuevaR' ? 0 : 1
      };
    }
    else {
      this.newReceta = receta;
    }
    this.newRecetaIngredientes = [];
    this.newRecetaIngredientesOriginales = [];
    ingredientes.forEach((ing) => {
      this.newRecetaIngredientes.push({
        idingredientereceta: ing.idingredientereceta,
        idingrediente: ing.idingrediente,
        nombre: ing.nombre,
        cantidad: ing.cantidad,
        unidad: ing.unidad
      });
      this.newRecetaIngredientesOriginales.push({
        idingredientereceta: ing.idingredientereceta,
        idingrediente: ing.idingrediente,
        nombre: ing.nombre,
        cantidad: ing.cantidad,
        unidad: ing.unidad
      });
    });
    this.modoVista = modo;
    this.pantalla = Pantallas.NUEVA_RECETA;
  }

  cambiarNombreReceta(event: Event) {
    let nuevoNombre = (event.target as HTMLInputElement).value;
    if (nuevoNombre === '') {
      this.newReceta.nombre = 'Introducir nombre';
    }
    else {
      this.newReceta.nombre = nuevoNombre;
    }
  }

  cambiarCantidadNuevaReceta(event: Event) {
    let nuevaCantidad = (event.target as HTMLInputElement).value;
    nuevaCantidad = nuevaCantidad.replaceAll(",", "");
    if (!Number.isNaN(+nuevaCantidad) && Number.isInteger(+nuevaCantidad) && parseInt(nuevaCantidad) > 0){
      this.newReceta.rinde_valor = parseInt(nuevaCantidad);
    }
    else {
      (event.target as HTMLInputElement).value = this.newReceta.rinde_valor.toString();
    }
  }

  cambiarUnidadMedidaReceta(event: Event) {
    let nuevaUnidadMedida = (event.target as HTMLInputElement).value;
    this.newReceta.rinde_unidad = nuevaUnidadMedida;
  }

  cambiarCantidadIngrediente(ingrediente: IngredienteRecetaCreate, event: Event) {
    let nuevaCantidad = (event.target as HTMLInputElement).value;
    nuevaCantidad = nuevaCantidad.replaceAll(",", "");
    if (!Number.isNaN(+nuevaCantidad) && Number.isInteger(+nuevaCantidad) && parseInt(nuevaCantidad) > 0){
      ingrediente.cantidad = parseInt(nuevaCantidad);
    }
    else {
      (event.target as HTMLInputElement).value = ingrediente.cantidad.toString();
    }
  }

  openDialogIngredienteNuevaReceta(): void {
    const dialogRef = this.dialog.open(DialogOverviewDialogIngrediente);

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        let sendIngrediente = {
          nombre: result.nombre[0].toUpperCase() + result.nombre.substr(1).toLowerCase(),
          unidadmedida: result.unidadmedida,
          precio: result.precio,
          es_receta: 0
        }

        fetch("https://g851fb2b7286839-mumodatabase.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/ingredientes/", {
          method: "POST",
          body: JSON.stringify(sendIngrediente),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response) => response.json())
        .catch((e) => console.error(e))
        .then((r) => {
          this.newRecetaIngredientes.push({
            idingredientereceta: r.idingredientereceta,
            idingrediente: r.idingrediente,
            nombre: r.nombre,
            cantidad: 1,
            unidad: (r.unidadmedida === 'Kg') ? 'gr' : (r.unidadmedida === 'Lt') ? 'ml' : 'Un'
          });
          this.ingredientes.push(r);
        })
      }
    });
  }

  openDialogIngredienteExistente(): void {
    const dialogRef = this.dialog.open(DialogOverviewBuscarIngrediente, {data: this.ingredientes});

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && this.newRecetaIngredientes.findIndex((ing) => ing.idingrediente === result.idingrediente) === -1) {
        let ingOriginal = this.newRecetaIngredientesOriginales.find(ing => ing.idingrediente === result.idingrediente);
        this.newRecetaIngredientes.push({
          idingredientereceta: ingOriginal === undefined ? 0 : ingOriginal.idingredientereceta,
          idingrediente: result.idingrediente,
          nombre: result.nombre,
          cantidad: 1,
          unidad: (result.unidadmedida === 'Kg') ? 'gr' : (result.unidadmedida === 'Lt') ? 'ml' : 'Un'
        });
      }
    })
  }

  sacarIngredienteReceta(ingrediente: IngredienteRecetaCreate) {
    let index = this.newRecetaIngredientes.findIndex(ing => ing.idingrediente === ingrediente.idingrediente);
    this.newRecetaIngredientes.splice(index, 1);
  }

  homeFromNuevaReceta(ingredienteOPreparacionEditada: boolean = false) {
    this.loading = true;
    this.pantalla = Pantallas.HOME;
    this.selectedTab = Pantallas.RECETAS;
    if (ingredienteOPreparacionEditada) {
        this.recalcularIngredientesPreparaciones();
    }
    fetch("https://g851fb2b7286839-mumodatabase.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/recetas/?limit=1000&q={\"$orderby\":{\"nombre\": \"asc\"}}")
    .then((response) => response.json())
    .catch((e) => console.error(e))
    .then((r) => {
      this.recetas = [];
      this.preparaciones = [];
      let receprepas = r.items;
      receprepas.forEach((receprepa: Receta) => {
        if (receprepa.es_ingrediente === 0){
            this.recetas.push(receprepa);
        }
        else {
            this.preparaciones.push(receprepa);
        }
      });
    })
    .then(() => {
      fetch("https://g851fb2b7286839-mumodatabase.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/ingredientes/?limit=1000&q={\"$orderby\":{\"nombre\": \"asc\"}}")
      .then((response) => response.json())
      .catch((e) => console.error(e))
      .then((r) => {
        this.ingredientes = r.items;
      })
      .then(() => {
        fetch("https://g851fb2b7286839-mumodatabase.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/ingredientesreceta/?limit=1000&q={\"$orderby\":{\"idreceta\": \"asc\"}}")
        .then((response) => response.json())
        .catch((e) => console.error(e))
        .then((r) => {
          this.ingredientesRecetas = r.items;
            
          this.ingredientesOriginal = [];
          this.ingredientesFiltrados = [];
          this.ingredientes.forEach((ing) => this.ingredientesOriginal.push(Object.assign({}, ing)));
          this.ingredientes.forEach((ing) => this.ingredientesFiltrados.push(Object.assign({}, ing)));
          this.calcularCostosRecetas();
          this.calcularCostosPreparaciones();
          this.filteredRecetas = this.myControlReceta.valueChanges.pipe(
            startWith(''),
            map(value => {
              const nombre = typeof value === 'string' ? value : value?.nombre;
              return nombre ? this._filterRecetas(nombre as string) : this.recetas.slice();
            })
          );
          this.filteredPreparaciones = this.myControlPreparacion.valueChanges.pipe(
            startWith(''),
            map(value => {
              const nombre = typeof value === 'string' ? value : value?.nombre;
              return nombre ? this._filterPreparaciones(nombre as string) : this.preparaciones.slice();
            })
          );
          this.loading = false;
        });
      });
    });
  }

  async crearReceta() {
    if (this.newReceta.nombre !== '' && this.newReceta.nombre !== 'Introducir nombre') {
      if (this.newRecetaIngredientes.length !== 0) {
        this.loading = true;
        if (this.modoVista === 'NuevaR' || this.modoVista === 'NuevaP'){
          let sendReceta = {
            nombre: this.newReceta.nombre[0].toUpperCase() + this.newReceta.nombre.substr(1).toLowerCase(),
            rinde_valor: this.newReceta.rinde_valor,
            rinde_unidad: this.newReceta.rinde_unidad,
            es_ingrediente: this.modoVista === 'NuevaR' ? 0 : 1
          };
  
          await fetch("https://g851fb2b7286839-mumodatabase.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/recetas/", {
            method: "POST",
            body: JSON.stringify(sendReceta),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((response) => response.json())
          .catch((e) => console.error(e))
          .then(async (res) => {
            await this.insertarIngredientesReceta(this.newRecetaIngredientes, res)
            .then(async () => {
                if (this.modoVista === 'NuevaP') {
                    await fetch('https://g851fb2b7286839-mumodatabase.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/recetas/?q={"nombre":"' + sendReceta.nombre + '"}')
                    .then((response) => response.json())
                    .catch((e) => console.error(e))
                    .then(async (r) => {

                        let esta_receta = r.items[0];

                        let costo: number = 0;
                        for (let ingrediente of this.newRecetaIngredientes) {
                            let ingrBase = this.ingredientes.find((ing) => ing.idingrediente === ingrediente.idingrediente);
                            if (ingrBase?.unidadmedida === ingrediente.unidad) {
                                costo += ingrediente.cantidad * ingrBase.precio;
                            }
                            else if ((ingrBase?.unidadmedida === 'Kg' || ingrBase?.unidadmedida === 'Lt') && (ingrediente.unidad === 'gr' || ingrediente.unidad === 'ml')){
                                costo += ingrediente.cantidad * ingrBase.precio / 1000;
                            }
                        }
                        if (esta_receta.rinde_unidad === 'gramos') {
                            costo = 1000 * costo / esta_receta.rinde_valor
                        }
                        else {
                            costo /= esta_receta.rinde_valor
                        }
                        let preparacion = {
                            nombre: esta_receta.nombre,
                            unidadmedida: esta_receta.rinde_unidad === 'gramos' ? 'Kg' : 'Un',
                            precio: parseFloat(costo.toFixed(2)),
                            es_receta: 1
                        }

                        await fetch("https://g851fb2b7286839-mumodatabase.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/ingredientes/", {
                            method: "POST",
                            body: JSON.stringify(preparacion),
                            headers: {
                              'Content-Type': 'application/json'
                            }
                        })
                        .catch((e) => console.error(e))
                        .then(async () => {
                            this.loading = false;
                            const dialogRef = this.dialog.open(DialogOverviewTexto, {data: 'Preparación cargada exitosamente'})
                
                            dialogRef.afterClosed().subscribe(() => {
                                this.homeFromNuevaReceta();
                            })
                        })
                    })
                }
                else {
                    this.loading = false;
                    const dialogRef = this.dialog.open(DialogOverviewTexto, {data: 'Receta cargada exitosamente'})
        
                    dialogRef.afterClosed().subscribe(() => {
                        this.homeFromNuevaReceta();
                    })
                }
            })
          })
        }
        else {
          let updateReceta = {
            nombre: this.newReceta.nombre[0].toUpperCase() + this.newReceta.nombre.substr(1).toLowerCase(),
            rinde_valor: this.newReceta.rinde_valor,
            rinde_unidad: this.newReceta.rinde_unidad,
            es_ingrediente: this.newReceta.es_ingrediente
          };

          await fetch("https://g851fb2b7286839-mumodatabase.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/recetas/" + this.newReceta.idreceta, {
            method: "PUT",
            body: JSON.stringify(updateReceta),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .catch((e) => console.error(e))
          .then(async () => {
            let borrar = this.newRecetaIngredientesOriginales.filter(ing => this.newRecetaIngredientes.findIndex(ingr => ingr.idingrediente === ing.idingrediente) === -1);
            let agregar = this.newRecetaIngredientes.filter(ing => this.newRecetaIngredientesOriginales.findIndex(ingr => ingr.idingrediente === ing.idingrediente) === -1);
            let modificar = this.newRecetaIngredientes.filter(ing => this.newRecetaIngredientesOriginales.findIndex(ingr => ingr.idingrediente === ing.idingrediente && ingr.cantidad !== ing.cantidad) !== -1);

            await this.borrarIngredientesReceta(borrar)
            .then(async () => {
              await this.insertarIngredientesReceta(agregar, this.newReceta)
              .then(async () => {
                await this.modificarIngredientesReceta(modificar, this.newReceta)
                .then(async () => {
                    if (this.newReceta.es_ingrediente === 1) {
                        let preparacionActualizada: Receta = {
                            ...updateReceta,
                            idreceta: this.newReceta.idreceta,
                            costo: this.newReceta.costo
                        };
                        this.preparaciones = this.preparaciones.filter(prep => prep.idreceta !== preparacionActualizada.idreceta);
                        this.preparaciones.push(preparacionActualizada);

                        let costo: number = 0;
                        for (let ingrediente of this.newRecetaIngredientes) {
                            let ingrBase = this.ingredientes.find((ing) => ing.idingrediente === ingrediente.idingrediente);
                            if (ingrBase?.unidadmedida === ingrediente.unidad) {
                                costo += ingrediente.cantidad * ingrBase.precio;
                            }
                            else if ((ingrBase?.unidadmedida === 'Kg' || ingrBase?.unidadmedida === 'Lt') && (ingrediente.unidad === 'gr' || ingrediente.unidad === 'ml')){
                                costo += ingrediente.cantidad * ingrBase.precio / 1000;
                            }
                        }
                        if (this.newReceta.rinde_unidad === 'gramos') {
                            costo = 1000 * costo / this.newReceta.rinde_valor
                        }
                        else {
                            costo /= this.newReceta.rinde_valor
                        }
                        let preparacion = {
                            nombre: this.newReceta.nombre,
                            unidadmedida: this.newReceta.rinde_unidad === 'gramos' ? 'Kg' : 'Un',
                            precio: parseFloat(costo.toFixed(2)),
                            es_receta: 1
                        };
                        let miIdIngrediente = this.ingredientes.find((ing) => ing.nombre === preparacion.nombre)!.idingrediente;
                        await fetch("https://g851fb2b7286839-mumodatabase.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/ingredientes/" + miIdIngrediente, {
                            method: "PUT",
                            body: JSON.stringify(preparacion),
                            headers: {
                              'Content-Type': 'application/json'
                            }
                        })
                        .catch((e) => console.error(e))
                        .then(async () => {
                            let ingredientePrep = {
                                ...preparacion,
                                idingrediente: miIdIngrediente
                            };
                            this.ingredientes = this.ingredientes.filter(ing => ing.idingrediente !== miIdIngrediente);
                            this.ingredientes.push(ingredientePrep);
                            this.loading = false;
                            const dialogRef = this.dialog.open(DialogOverviewTexto, {data: 'Preparación editada exitosamente'})
                
                            dialogRef.afterClosed().subscribe(() => {
                                this.homeFromNuevaReceta(true);
                            })
                        })
                    }
                    else {
                        this.loading = false;
                        const dialogRef = this.dialog.open(DialogOverviewTexto, {data: 'Receta editada exitosamente'})
        
                        dialogRef.afterClosed().subscribe(() => {
                            this.homeFromNuevaReceta();
                        })
                    }
                })
              })
            })
          })
        }
      }
      else {
        const dialogRef = this.dialog.open(DialogOverviewTexto, {data: 'Añadir al menos un ingrediente'});

        dialogRef.afterClosed().subscribe();
      }
    }
    else {
      const dialogRef = this.dialog.open(DialogOverviewTexto, {data: 'Introducir un nombre correcto'});

      dialogRef.afterClosed().subscribe();
    }
  }

  private async insertarIngredientesReceta(ingredientes: IngredienteRecetaCreate[], receta: Receta) {
    ingredientes.forEach((ing) => {
      let sendIngredienteReceta = {
        idingrediente: ing.idingrediente,
        idreceta: receta.idreceta,
        cantidad: ing.cantidad,
        unidadcantidad: ing.unidad
      };
      let insertarEnLista: IngredienteReceta = {
        ...sendIngredienteReceta,
        idingredientereceta: 0
      };
      this.ingredientesRecetas.push(insertarEnLista);

      fetch("https://g851fb2b7286839-mumodatabase.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/ingredientesreceta/", {
        method: "POST",
        body: JSON.stringify(sendIngredienteReceta),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    })
  }

  private async borrarIngredientesReceta(ingredientes: IngredienteRecetaCreate[]) {
    ingredientes.forEach(ing => {
      this.ingredientesRecetas = this.ingredientesRecetas.filter(ingrediente => ingrediente.idingredientereceta !== ing.idingredientereceta);
      fetch("https://g851fb2b7286839-mumodatabase.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/ingredientesreceta/" + ing.idingredientereceta, {
        method: "DELETE"
      })
    });
  }

  private async modificarIngredientesReceta(ingredientes: IngredienteRecetaCreate[], receta: Receta) {
    ingredientes.forEach(ing => {
      let sendIngredienteReceta = {
        idingrediente: ing.idingrediente,
        idreceta: receta.idreceta,
        cantidad: ing.cantidad,
        unidadcantidad: ing.unidad
      };

      let insertarEnLista: IngredienteReceta = {
        ...sendIngredienteReceta,
        idingredientereceta: ing.idingredientereceta
      };

      this.ingredientesRecetas = this.ingredientesRecetas.filter(ingrediente => ingrediente.idingredientereceta !== ing.idingredientereceta);
      this.ingredientesRecetas.push(insertarEnLista);

      fetch("https://g851fb2b7286839-mumodatabase.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/ingredientesreceta/" + ing.idingredientereceta, {
        method: "PUT",
        body: JSON.stringify(sendIngredienteReceta),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    })
  }

  private ordenarIngredientesReceta() {
    let desordenado;
    for (let i = 0; i < this.ingredientesSelectedReceta.length - 1; i++) {
        desordenado = false;
        for (let j = 0; j < this.ingredientesSelectedReceta.length - 1 - i; j++) {
            if (this.ingredientesSelectedReceta[j].nombre > this.ingredientesSelectedReceta[j + 1].nombre) {
                let aux = this.ingredientesSelectedReceta[j];
                this.ingredientesSelectedReceta[j] = this.ingredientesSelectedReceta[j + 1];
                this.ingredientesSelectedReceta[j + 1] = aux;
                desordenado = true;
            }
        }
        if (!desordenado) {
            break;
        }
    }
  }

  editarReceta() {
    this.resetCantidad();
    this.nuevaReceta(this.selectedReceta, this.ingredientesSelectedRecetaOriginal, 'Editar');
  }

  private async recalcularIngredientesPreparaciones() {
    let ingredientesPreparacionesActualizados: Ingrediente[] = [];
    let actualizado = true;
    while (actualizado) {
        actualizado = false;
        for (let preparacion of this.preparaciones) {
            let costo: number = 0;
            let ingsPrep = this.ingredientesRecetas.filter(ing => ing.idreceta === preparacion.idreceta);
            for (let ingrediente of ingsPrep) {
                let ingrBase = this.ingredientes.find((ing) => ing.idingrediente === ingrediente.idingrediente);
                if (ingrBase?.unidadmedida === ingrediente.unidadcantidad) {
                    costo += ingrediente.cantidad * ingrBase.precio;
                }
                else if ((ingrBase?.unidadmedida === 'Kg' || ingrBase?.unidadmedida === 'Lt') && (ingrediente.unidadcantidad === 'gr' || ingrediente.unidadcantidad === 'ml')){
                    costo += ingrediente.cantidad * ingrBase.precio / 1000;
                }
            }
            if (preparacion.rinde_unidad === 'gramos') {
                costo = 1000 * costo / preparacion.rinde_valor
            }
            else {
                costo /= preparacion.rinde_valor
            }
            costo = parseFloat(costo.toFixed(2));

            let ingredientePreparacion = this.ingredientes.find(ing => ing.nombre === preparacion.nombre)!;

            if (costo !== ingredientePreparacion.precio) {
                ingredientePreparacion.precio = costo;
                this.ingredientes = this.ingredientes.filter(ing => ing.nombre !== preparacion.nombre);
                this.ingredientes.push(ingredientePreparacion);
                ingredientesPreparacionesActualizados.push(ingredientePreparacion);
                actualizado = true;
            }
        }
    }
    ingredientesPreparacionesActualizados.forEach(async ing => {
        let sendIngrediente = {
            nombre: ing.nombre,
            precio: ing.precio,
            unidadmedida: ing.unidadmedida,
            es_receta: ing.es_receta
        };
        await fetch("https://g851fb2b7286839-mumodatabase.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/ingredientes/" + ing.idingrediente, {
            method: "PUT",
            body: JSON.stringify(sendIngrediente),
            headers: {
              'Content-Type': 'application/json'
            }
        });
    });
  }

}
