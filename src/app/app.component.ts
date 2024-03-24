import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Usuario } from './interfaces/usuarios';
import * as forge from 'node-forge';

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

  title: string = "costos-mumo";

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
    const hashUser = forge.md.sha256.create();
    const hashPassword = forge.md.sha256.create();
    hashUser.update(this.usuario);
    hashPassword.update(this.contrasena);
    let usuarioDigest = forge.util.encode64(hashUser.digest().data);
    let contraseñaDigest = forge.util.encode64(hashPassword.digest().data);

    let miUsuario = this.usuarios.find((user) => user.usuario === usuarioDigest);
    if (miUsuario !== undefined && miUsuario.contraseña === contraseñaDigest) {
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
