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

  empleados:any =[] ;

  visitasEmpleado : any=[];  ///todas
  visitasTemporal : any=[];

  nombreSupervisor: any;

  public formEmpleado = new FormGroup({
    dpi: new FormControl(null, [Validators.required, Validators.min(1000000000000)]), //13 caracteres que tiene el dpi válido
    nombres: new FormControl(null, [Validators.required]),
    apellidos: new FormControl(null, [Validators.required]),
    telefono: new FormControl(null, [Validators.required]),
    direccion: new FormControl(null, [Validators.required]),
  });
  
  constructor(private servicios: ServiciosAppService) { }

  ngOnInit(): void {


    this.servicios.obtenerEmpleados().toPromise().then( data => {

      let temp:any = data;
      temp.filter( (d: any) => {
        if( d.supervisor != null){
          this.empleados.push(d);
        }
      })


    })

    this.visitasEmpleado = this.servicios.obtenerVisitas();
    console.log("Visitas totales == " , this.visitasEmpleado)

  }

  crearEmpleado(){
    let form = this.formEmpleado.controls;
    let variables= {
      "nombres":form.nombres.value,
      "apellidos":form.apellidos.value, 
      "direccion":form.direccion.value,
      "telefono": form.telefono.value,
      "cui":form.dpi.value
    }

    console.log("datos === " , variables)

    this.servicios.crearEmpleado(variables).toPromise().then( resp =>{
      console.log("Respuesta ==== " , resp)
      this.mensajeExito()
    }).catch( err =>{
      console.log("Error ===== " , err)
    })
  }

  actualizarEmpleado(){

  }

  mensajeExito(){
    Swal.fire({
      title: "El empleado se ha creado con éxito.",
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

  llenarInfoVisitas(id:any, supervisor:any){

    console.log("datos del supervisor === " , supervisor)
    this.nombreSupervisor = supervisor?.nombres + ' ' +supervisor?.apellidos
    this.visitasTemporal=[]
    this.servicios.obtenerVisitas().toPromise().then( data => {
      let temp:any = data;
      temp.filter( (d: any) => {
        if( d.empleado.id ==id){
          this.visitasTemporal.push(d);
        }
      })
    })
  }

  formatoFecha(fecha:any){
    let temp = fecha.split('-'); //2023-06-22 
    return temp[2]+'-'+temp[1]+'-'+temp[0]
  }

}
