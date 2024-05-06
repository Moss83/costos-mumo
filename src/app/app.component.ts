import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HomeComponent } from './components/home/home.component';
import { Usuario } from './interfaces/usuarios';
import { DialogOverviewTexto } from './components/dialog-overview-guardar-precios/dialog-overview-texto.component';

const usuarios: Usuario[] = [
  {
    usuario: "silvana67",
    contraseña: "Alquerias32"
  },
  {
    usuario: "moss83",
    contraseña: "SeriBegawan511"
  }
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HomeComponent,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(public dialog: MatDialog){}

  title: string = "costos-mumo";

  logueado: boolean = false;

  incorrectos: boolean = false;

  bdPrendida: boolean = false;

  usuario: string = '';
  contrasena: string = '';

  ngOnInit(): void {
    fetch("https://g851fb2b7286839-mumodatabase.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/recetas/?limit=1")
    .then(r => {
      if (r.status === 200) {
        this.bdPrendida = true;
      }
      else {
        const dialogRef = this.dialog.open(DialogOverviewTexto, {data: 'Sistema inactivo'});
        dialogRef.afterClosed().subscribe();
      }
    });
  }

  login(): void {
    let miUsuario = usuarios.find((user) => user.usuario === this.usuario);
    if (miUsuario !== undefined && miUsuario.contraseña === this.contrasena) {
      this.logueado = true;
    }
    else {
      this.incorrectos = true;
      this.usuario = '';
      this.contrasena = '';
    }
  }

  cambioUsuario(event: Event) {
    this.usuario = (event.target as HTMLInputElement).value;
  }

  cambioContrasena(event: Event) {
    this.contrasena = (event.target as HTMLInputElement).value;
  }

  addStyleBoton(id: string){
    let element = document.getElementById(id);
    if (this.bdPrendida && element != null){
      element.style.backgroundColor = '#F472B6';
    }
  }

  removeStyleBoton(id: string) {
    let element = document.getElementById(id);
    if (this.bdPrendida && element != null){
      element.style.backgroundColor = '#EC4899';
    }
  }
}
