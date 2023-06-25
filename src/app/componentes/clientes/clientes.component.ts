import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiciosAppService } from 'src/app/servicios/servicios-app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes:any=[];

  public formCliente = new FormGroup({
    nombres: new FormControl(null, [Validators.required]),
    apellidos: new FormControl(null, [Validators.required]),
    nit: new FormControl(null, [Validators.required]),
    cui: new FormControl(null, [Validators.required]),
    empresa: new FormControl(null, [Validators.required]),
    direccion: new FormControl(null, [Validators.required]),
  });

  
  constructor( private servicios: ServiciosAppService) { }

  ngOnInit(): void {

    this.servicios.obtenerClientes().toPromise().then( data => {
      this.clientes = data;
    })

  }


  crearCliente(){
    let form = this.formCliente.controls;
    let variables= {
      "nombres":form.nombres.value,
      "apellidos":form.apellidos.value, 
      "nombreEmpresa":form.empresa.value, 
      "nit":form.nit.value, 
      "direccion":form.direccion.value,
      // "telefono": form.telefono.value,
      "cui":form.cui.value
    }

    console.log("datos === " , variables)

    this.servicios.crearCliente(variables).toPromise().then( resp =>{
      console.log("Respuesta ==== " , resp)
      this.mensajeExito()
    }).catch( err =>{
      console.log("Error ===== " , err)
    })
  }


  mensajeExito(){
    Swal.fire({
      title: "El cliente se ha creado con éxito.",
      icon: 'success',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      html: 'Se registró con éxito',
    }).then((result) => {
      location.href = 'bandeja'
    });
  }

  mensajeError(texto:any){
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: texto,
    })
  }




}
