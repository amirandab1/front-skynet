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

  clientes: any = [];
  clienteTemporal: any;

  public formCliente = new FormGroup({
    nombres: new FormControl(null, [Validators.required]),
    apellidos: new FormControl(null, [Validators.required]),
    nit: new FormControl(null, [Validators.required]),
    cui: new FormControl(null, [Validators.required]),
    empresa: new FormControl(null, [Validators.required]),
    direccion: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),

  });

  public formEditarCliente = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    nombres: new FormControl(null, [Validators.required]),
    apellidos: new FormControl(null, [Validators.required]),
    nit: new FormControl(null, [Validators.required]),
    cui: new FormControl(null, [Validators.required]),
    empresa: new FormControl(null, [Validators.required]),
    direccion: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),

  });

  constructor(private servicios: ServiciosAppService) { }

  ngOnInit(): void {

    this.servicios.obtenerClientes().toPromise().then(data => {
      this.clientes = data;
      console.log("que  hay en data === " , data)
    })

  }


  crearCliente() {
    let form = this.formCliente.controls;
    let variables = {
      "nombres": form.nombres.value,
      "apellidos": form.apellidos.value,
      "nombreEmpresa": form.empresa.value,
      "nit": form.nit.value,
      "direccion": form.direccion.value,
      "cui": form.cui.value,
      "email": form.email.value
    }

    console.log("datos === ", variables)

    this.servicios.crearCliente(variables).toPromise().then(resp => {
      console.log("Respuesta ==== ", resp)
      this.mensajeExito("El cliente se ha creado con éxito.", "Se registró con éxito")
    }).catch(err => {
      console.log("Error ===== ", err)
    })
  }


  mensajeExito(texto: string, mensaje: string) {
    Swal.fire({
      title: texto,
      icon: 'success',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      html: mensaje,
    }).then((result) => {
      location.href = 'bandeja'
    });
  }

  mensajeError(texto: any) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: texto,
    })
  }

  async llenarDatosEditar(idCliente: any) {

    let form = this.formEditarCliente.controls;


    await this.servicios.obtenerClientes().toPromise().then(data => {
      let temp: any = data;
      temp.filter((d: any) => {
        if (d.id == idCliente) {
          this.clienteTemporal = d;
        }
      })

      form.id.setValue(this.clienteTemporal.id);
      form.nombres.setValue(this.clienteTemporal.nombres);
      form.apellidos.setValue(this.clienteTemporal.apellidos);
      form.empresa.setValue(this.clienteTemporal.nombreEmpresa);
      form.nit.setValue(this.clienteTemporal.nit);
      form.direccion.setValue(this.clienteTemporal.direccion);
      form.cui.setValue(this.clienteTemporal.cui);
      form.email.setValue(this.clienteTemporal.email);

    })

  }

  async actualizarCliente() {

    let form = this.formEditarCliente.controls;

    let variables = {
      "id": form.id.value,
      "nombres": form.nombres.value,
      "apellidos": form.apellidos.value,
      "nombreEmpresa": form.empresa.value,
      "nit": form.nit.value,
      "direccion": form.direccion.value,
      "cui": form.cui.value,
      "email": form.email.value
    }


    this.servicios.actualizarCliente(variables, form.id.value).toPromise().then(resp => {
      console.log("Respuesta ==== ", resp)
      this.mensajeExito("El cliente se ha actualizado con éxito.", "Se actualizó con éxito")
    }).catch(err => {
      console.log("Error ===== ", err)
    })

  }


}
