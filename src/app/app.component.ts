import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HomeComponent } from './components/home/home.component';
import { Usuario } from './interfaces/usuarios';
import { DialogOverviewTexto } from './components/dialog-overview-guardar-precios/dialog-overview-texto.component';


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

  usuarios: Usuario[] = [];

  ngOnInit(): void {
    fetch("https://g851fb2b7286839-mumodatabase.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/usuarios/")
    .then(res => {
      if (res.status === 200) {
        this.bdPrendida = true;
        res.json()
        .then(r => {
            this.usuarios = r.items;
            this.bdPrendida = true;
        });
      }
      else {
        const dialogRef = this.dialog.open(DialogOverviewTexto, {data: 'Sistema inactivo'});
        dialogRef.afterClosed().subscribe();
      }
    });
  }

  login(): void {
    fetch("https://api.hashify.net/hash/sha256/hex?value=" + this.usuario)
    .then(res => res.json())
    .catch(e => console.error(e))
    .then(r => {
        let usuarioHash = r.Digest;
        let miUsuario = this.usuarios.find((user) => user.usuario === usuarioHash);
        fetch("https://api.hashify.net/hash/sha256/hex?value=" + this.contrasena)
        .then(resp => resp.json())
        .catch(err => console.error(err))
        .then(rr => {
            let contraseñaHash = rr.Digest;
            if (miUsuario !== undefined && miUsuario.contrasena === contraseñaHash) {
                this.logueado = true;
            }
            else {
                this.incorrectos = true;
                this.usuario = '';
                this.contrasena = '';
            }
        })
    })
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
