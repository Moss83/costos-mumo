import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Usuario } from './interfaces/usuarios';

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
export class AppComponent implements OnInit{

  logueado: boolean = false;

  incorrectos: boolean = false;

  usuarios: Usuario[] = [];

  usuario: string = '';
  contrasena: string = '';

  ngOnInit(): void {
    fetch("https://g851fb2b7286839-mumodatabase.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/usuarios/")
    .then((response) => response.json())
    .catch((e) => console.error(e))
    .then((res) => {
      this.usuarios = res.items;
    })
  }

  login(): void {
    let miUsuario = this.usuarios.find((user) => user.usuario === this.usuario);
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
