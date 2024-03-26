import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Usuario } from './interfaces/usuarios';

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
export class AppComponent {

  title: string = "costos-mumo";

  logueado: boolean = false;

  incorrectos: boolean = false;

  usuario: string = '';
  contrasena: string = '';

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
    if (element != null){
      element.style.backgroundColor = '#F472B6';
    }
  }

  removeStyleBoton(id: string) {
    let element = document.getElementById(id);
    if (element != null){
      element.style.backgroundColor = '#EC4899';
    }
  }
}
