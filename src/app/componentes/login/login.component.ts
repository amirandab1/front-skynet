import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiciosAppService } from 'src/app/servicios/servicios-app.service';
// import { serviciosApp } from 'src' 'src/app/servicios/serviciosApp.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public formLogin = new FormGroup({
    usuario: new FormControl(null, Validators.required),
    contrasenia: new FormControl(null, Validators.required),
  });

  mostrar:boolean=false;

  constructor( private router: Router, private servicios: ServiciosAppService) { }

  ngOnInit(): void {
  }

  autenticar(){
    this.mostrar=true;

    let valido:boolean = true; //this.servicios.datosCorrectos(this.formLogin.controls.usuario.value, this.formLogin.controls.contrasenia.value);

    setTimeout(() => {
      this.mostrar=false;
      if( valido ){
        alert('Bienvenido ' + this.formLogin.controls.usuario.value)
        //location.href = 'bandeja-principal'
        this.router.navigate(['bandeja']);
      }
      else{
        Swal.fire({
          title: "Error al autenticar",
          icon: 'error',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
        }).then((result) => {
          location.reload()
        });
      }
    }, 2000);
    
  //consumir método para validar si existe el usuario y si las credenciales son válidas
  // para pruebas usaré admin admin

 

  }

}
