import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiciosAppService } from 'src/app/servicios/servicios-app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  empleados: any = [];

  visitasEmpleado: any = [];  ///todas
  visitasTemporal: any = [];

  nombreSupervisor: any;
  empleadoTemporal: any;
  supervisorTemporal: any;
  supervisores: any=[];

  public formEmpleado = new FormGroup({
    dpi: new FormControl(null, [Validators.required, Validators.min(1000000000000)]), //13 caracteres que tiene el dpi válido
    nombres: new FormControl(null, [Validators.required]),
    apellidos: new FormControl(null, [Validators.required]),
    telefono: new FormControl(null, [Validators.required]),
    direccion: new FormControl(null, [Validators.required]),
  });

  public formEditarEmpleado = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    dpi: new FormControl(null, [Validators.required, Validators.min(1000000000000)]), //13 caracteres que tiene el dpi válido
    nombres: new FormControl(null, [Validators.required]),
    apellidos: new FormControl(null, [Validators.required]),
    telefono: new FormControl(null, [Validators.required]),
    direccion: new FormControl(null, [Validators.required]),
    idSupervisor: new FormControl(null),

  });

  constructor(private servicios: ServiciosAppService) { }

  ngOnInit(): void {


    this.servicios.obtenerEmpleados().toPromise().then(data => {

      let temp: any = data;
      temp.filter((d: any) => {
        if (d.supervisor != null) {
          this.empleados.push(d);
        }
      })


    })

    this.servicios.obtenerSupervisores().toPromise().then( data => {
      let temp:any = data;
      temp.filter( (d: any) => {
        if( d.supervisor == null){
          this.supervisores.push(d);
        }
      })
    })

    this.visitasEmpleado = this.servicios.obtenerVisitas();
    console.log("Visitas totales == ", this.visitasEmpleado)

  }

  crearEmpleado() {
    let form = this.formEmpleado.controls;
    let variables = {
      "nombres": form.nombres.value,
      "apellidos": form.apellidos.value,
      "direccion": form.direccion.value,
      "telefono": form.telefono.value,
      "cui": form.dpi.value
    }

    console.log("datos === ", variables)

    this.servicios.crearEmpleado(variables).toPromise().then(resp => {
      console.log("Respuesta ==== ", resp)
      this.mensajeExito("El empleado se ha creado con éxito.", "Se registró con éxito")
    }).catch(err => {
      console.log("Error ===== ", err)
    })
  }



  mensajeExito(texto:string, mensaje: string) {
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

  llenarInfoVisitas(id: any, supervisor: any) {

    console.log("datos del supervisor === ", supervisor)
    this.nombreSupervisor = supervisor?.nombres + ' ' + supervisor?.apellidos
    this.visitasTemporal = []
    this.servicios.obtenerVisitas().toPromise().then(data => {
      let temp: any = data;
      temp.filter((d: any) => {
        if (d.empleado.id == id) {
          this.visitasTemporal.push(d);
        }
      })
    })
  }

  formatoFecha(fecha: any) {
    let temp = fecha.split('-'); //2023-06-22 
    return temp[2] + '-' + temp[1] + '-' + temp[0]
  }

  async llenarDatosEditar(idEmpleado: any) {
    let form = this.formEditarEmpleado.controls;

    
    await this.servicios.obtenerEmpleados().toPromise().then(data => {
      let temp: any = data;
      temp.filter((d: any) => {
        if (d.id == idEmpleado) {
          this.empleadoTemporal = d;
        }
      })

      form.id.setValue(this.empleadoTemporal.id);
      form.dpi.setValue(this.empleadoTemporal.cui);
      form.nombres.setValue(this.empleadoTemporal.nombres);
      form.apellidos.setValue(this.empleadoTemporal.apellidos);
      form.telefono.setValue(this.empleadoTemporal.telefono);
      form.direccion.setValue(this.empleadoTemporal.direccion);
      form.idSupervisor.setValue(this.empleadoTemporal.supervisor?.id);

      // this.formEditarEmpleado.valid //= true;
    })
    
    
  }

  async actualizarEmpleado() {

    let form = this.formEditarEmpleado.controls;
    let variables:any;
      let temp:any = this.supervisores;
      temp.filter( (d: any) => {
          if( d.id == form.idSupervisor.value){
            variables = {
              "id": form.id.value,
              "nombres": form.nombres.value,
              "apellidos": form.apellidos.value,
              "direccion": form.direccion.value,
              "telefono": form.telefono.value,
              "cui": form.dpi.value,
              "supervisor": d
            }
            
            this.servicios.actualizarEmpleado(variables, form.id.value).toPromise().then(resp => {
              console.log("Respuesta ==== ", resp)
              this.mensajeExito("El empleado se ha actualizado con éxito.", "Se actualizó con éxito")
            }).catch(err => {
              console.log("Error ===== ", err)
            })
        }
      })
      
  }

  async obtenerSupervisor(idSupervisor: any){
    // console.log("ID que llega === " , idSupervisor)
    let dato:any; 

    await this.servicios.obtenerSupervisores().toPromise().then( data => {
      let temp:any = data;
      temp.filter( (d: any) => {
        // console.log("DATO === " , d)
        if( d.supervisor?.id == idSupervisor){
          dato = d;
          // console.log("Dato que coincide === " , dato)
          return dato;
        }
      })
    })
  }

}
