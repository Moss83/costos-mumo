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
import { DialogOverviewGuardarPrecios } from '../dialog-overview-guardar-precios/dialog-overview-guardar-precios.component';
import { Pantallas } from '../enums/pantallas-enum';
import { IngredienteRecetaView } from '../../interfaces/ingrediente-receta-view';

const PLUS_ICON =
  `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#FFFFFF" version="1.1" id="Capa_1" width="600px" height="600px" viewBox="0 0 50 40" xml:space="preserve">
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
    DialogOverviewDialogIngrediente,
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
    iconRegistry.addSvgIconLiteral('chef-hat', sanitizer.bypassSecurityTrustHtml(CHEF_HAT_ICON));
    iconRegistry.addSvgIconLiteral('undo', sanitizer.bypassSecurityTrustHtml(UNDO_ICON));
    iconRegistry.addSvgIconLiteral('enter', sanitizer.bypassSecurityTrustHtml(ENTER_ICON));
  }

  loading: boolean = true;

  pantalla: Pantallas = Pantallas.HOME;

  selectedTab: Pantallas = Pantallas.RECETAS;

  botonesDisabled: boolean = true;

  myControlReceta = new FormControl<string | Receta>('');
  myControlIngrediente = new FormControl<string | Ingrediente>('');
  recetas: Receta[] = [];
  ingredientes: Ingrediente[] = [];
  ingredientesRecetas: IngredienteReceta[] = [];

  filteredRecetas: Observable<Receta[]> = new Observable<Receta[]>;
  filteredIngredientes: Observable<Ingrediente[]> = new Observable<Ingrediente[]>;
  recetasFiltradas: Receta[] = [];
  ingredientesFiltrados: Ingrediente[] = [];
  ingredientesOriginal: Ingrediente[] = [];

  selectedReceta: Receta = {
    idreceta: 0,
    nombre: '',
    costo: 0,
    rinde_unidad: '',
    rinde_valor: 0
  };

  ingredientesSelectedReceta: IngredienteRecetaView[] = [];

  ingredientesSelectedRecetaOriginal: IngredienteRecetaView[] = [];

  cantidadOriginal: number = 0;

  cantidadSeleccionada: number = 0;

  costoOriginal: number = 0;

  ngOnInit() {
    fetch("https://g851fb2b7286839-mumodatabase.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/recetas/?limit=1000&q={\"$orderby\":{\"nombre\": \"asc\"}}")
    .then((response) => response.json())
    .catch((e) => console.error(e))
    .then((r) => {
      this.recetas = r.items;
    })
    .then(() => {
      fetch("https://g851fb2b7286839-mumodatabase.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/ingredientes/?limit=1000&q={\"$orderby\":{\"nombre\": \"asc\"}}")
      .then((response) => response.json())
      .catch((e) => console.error(e))
      .then((r) => {
        this.ingredientes = r.items;
      })
      .then(() => {
        fetch("https://g851fb2b7286839-mumodatabase.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/ingredientesreceta/?limit=1000")
        .then((response) => response.json())
        .catch((e) => console.error(e))
        .then((r) => {
          this.ingredientesRecetas = r.items;

          this.calcularCostosRecetas();

          this.ingredientes.forEach((ing) => this.ingredientesOriginal.push(Object.assign({}, ing)));
          this.ingredientes.forEach((ing) => this.ingredientesFiltrados.push(Object.assign({}, ing)));
          this.filteredRecetas = this.myControlReceta.valueChanges.pipe(
            startWith(''),
            map(value => {
              const nombre = typeof value === 'string' ? value : value?.nombre;
              return nombre ? this._filterRecetas(nombre as string) : this.recetas.slice();
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

  displayFn(receta: Receta): string {
    return receta && receta.nombre ? receta.nombre : '';
  }

  private _filterRecetas(nombre: string): Receta[] {
    const filterValue = nombre.toLowerCase();
    this.recetasFiltradas = this.recetas.filter(option => option.nombre.toLowerCase().includes(filterValue));
    return this.recetasFiltradas;
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

  changeTab(tab: Pantallas) {
    this.selectedTab = tab;
  }

  recetaEscritaVacia() {
    if (this.myControlReceta.value?.toString().length === 0){
      this.recetasFiltradas = this.recetas;
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
    if (element != null && (id === 'editar' || id === 'undo' || id === 'enter')){
      element.style.backgroundColor = '#F472B6';
    }
    else if (element != null && id === 'atras') {
      element.style.backgroundColor = '#E5E7EB';
    }
  }

  removeStyleBotonesVerReceta(id: string) {
    let element = document.getElementById(id);
    if (element != null && (id === 'editar' || id === 'undo' || id === 'enter')){
      element.style.backgroundColor = '#EC4899';
    }
    else if (element != null && id === 'atras') {
      element.style.backgroundColor = '#D1D5DB';
    }
  }

  cambiarPrecioIngrediente(ingrediente: Ingrediente, event: Event) {
    let nuevoPrecio = (event.target as HTMLInputElement).value;
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
    for (let ingrediente of this.ingredientes) {
      if (ingrediente.precio !== this.ingredientesOriginal[this.ingredientesOriginal.findIndex((ing) => ing.idingrediente === ingrediente.idingrediente)].precio) {
        let sendIngrediente = {
          nombre: ingrediente.nombre,
          unidadmedida: ingrediente.unidadmedida,
          precio: ingrediente.precio
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
    this.openDialogGuardarPrecios();
  }

  openDialogIngrediente(): void {
    const dialogRef = this.dialog.open(DialogOverviewDialogIngrediente);

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        let sendIngrediente = {
          nombre: result.nombre[0].toUpperCase() + result.nombre.substr(1).toLowerCase(),
          unidadmedida: result.unidadmedida,
          precio: result.precio
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
    const dialogRef = this.dialog.open(DialogOverviewGuardarPrecios);

    dialogRef.afterClosed().subscribe();
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
        idingrediente: ing.idingrediente,
        nombre: ingOriginal.nombre,
        cantidad: ing.cantidad,
        unidad: ing.unidadcantidad,
        precio: (ingOriginal.unidadmedida === 'Un') ? ing.cantidad * ingOriginal.precio : ingOriginal.precio / 1000 * ing.cantidad
      }
      this.ingredientesSelectedReceta.push(ingView);
    });
    this.ingredientesSelectedReceta.forEach((ing) => this.ingredientesSelectedRecetaOriginal.push(Object.assign({}, ing)));
    this.pantalla = Pantallas.VER_RECETA;
  }

  cambiarCantidadReceta(event: Event) {
    let nuevaCantidad = (event.target as HTMLInputElement).value;
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
      ingr.cantidad = this.cantidadSeleccionada * ing.cantidad / this.cantidadOriginal;
      ingr.precio = this.cantidadSeleccionada * ing.precio / this.cantidadOriginal;
      costoTotal += ingr.precio;
    });
    this.selectedReceta.costo = costoTotal;
  }

  home() {
    this.resetCantidad();
    this.pantalla = Pantallas.HOME;
    this.selectedTab = Pantallas.RECETAS;
  }

  pantallas() {
    return Pantallas;
  }
}
