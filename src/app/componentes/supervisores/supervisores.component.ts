import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiciosAppService } from 'src/app/servicios/servicios-app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-supervisores',
  templateUrl: './supervisores.component.html',
  styleUrls: ['./supervisores.component.css']
})
export class SupervisoresComponent implements OnInit {


  supervisores: any = []
  tecnicos: any = [];
  tecnicosTemporal: any = [];
  tecnico: any;
  idSupervisorTemporal: any;
  clientes: any;
  tiposServicio: any = [];

  public formVisita = new FormGroup({
    idTecnico: new FormControl(null, [Validators.required]),
    motivo: new FormControl(null, [Validators.required]),
    idCliente: new FormControl(null, [Validators.required]),
    idServicio: new FormControl(null, [Validators.required]),
    fechaVisita: new FormControl(null, [Validators.required]),
    direccionOrigen: new FormControl(null, [Validators.required]),
    direccionDestino: new FormControl(null, [Validators.required]),

  });

  public formAsignarTecnico = new FormGroup({
    idTecnico: new FormControl(null, [Validators.required])
  });


  constructor(private servicios: ServiciosAppService) { }

  ngOnInit(): void {

    //    this.supervisores = this.servicios.obtenerSupervisores();

    this.servicios.obtenerSupervisores().toPromise().then(data => {
      let temp: any = data;
      temp.filter((d: any) => {
        if (d.supervisor == null) {
          this.supervisores.push(d);
        }
      })
    })

    this.servicios.obtenerEmpleados().toPromise().then(data => {
      let temp: any = data;
      temp.filter((d: any) => {
        if (d.supervisor != null) {
          this.tecnicos.push(d);
        }
      })
      //this.tecnicos = data
    });
    this.servicios.obtenerClientes().toPromise().then(data => {
      this.clientes = data;
    })
    this.tiposServicio = this.servicios.obtenerServicios()
      .toPromise().then(data => {
        console.log("que hay en data === ", data)
        this.tiposServicio = data;
      })
  }

  async llenarDatos() {
    let form = this.formVisita.controls;

    let date = new Date(form.fechaVisita.value);
    let date2 = new Date();

    if (date < date2) {
      this.mensajeError('La fecha de la visita no puede ser anterior a la fecha actual');
      this.formVisita.reset()
    } else {

      let tecnico: any = await this.tecnicoSeleccionado(form.idTecnico.value);
      console.log("Empleado ===  ", tecnico)
      let cliente: any = await this.clienteSeleccionado(form.idCliente.value);
      console.log("Cliente ===  ", cliente)
      let servicio: any = await this.servicioSeleccionado(form.idServicio.value);
      console.log("Servicio ===  ", servicio)

      this.crearVisita(tecnico, servicio, cliente)

    }
  }

  async crearVisita(tecnico: any, servicio: any, cliente: any) {  //crearVisita
    let form = this.formVisita.controls;


    let variables = [{
      motivo: form.motivo.value,
      fechaVisita: form.fechaVisita.value,
      direccionOrigen: form.direccionOrigen.value,
      direccionDestino: form.direccionDestino.value,
      empleado: tecnico,
      cliente: cliente,
      servicio: servicio,
    }]

    console.log("Variables === ", variables)
    this.servicios.crearVisita(variables).toPromise().then(resp => {
      console.log("Respuesta ==== ", resp)
      this.mensajeExito2()
    }).catch(err => {
      console.log("Error ===== ", err)
    });
  }

  async tecnicoSeleccionado(id: any) {
    let coincide: any;
    await this.servicios.obtenerEmpleados().toPromise().then(data => {
      let temp: any = data;
      temp.filter((d: any) => {
        if (d.id == id) {
          coincide = d
        }
      })
    })
    return coincide;
  }

  async clienteSeleccionado(id: any) {
    let coincide: any;
    await this.servicios.obtenerClientes().toPromise().then(data => {
      let temp: any = data;
      temp.filter((d: any) => {
        if (d.id == id) {
          coincide = d
        }
      })
    })
    return coincide;
  }

  async servicioSeleccionado(id: any) {
    let coincide: any;
    await this.servicios.obtenerServicios().toPromise().then(data => {
      let temp: any = data;
      temp.filter((d: any) => {
        if (d.id == id) {
          coincide = d
        }
      })
    })
    return coincide;
  }


  llenarInfoTecnicos(id: any) {
    this.tecnicosTemporal = []
    this.servicios.obtenerEmpleados().toPromise().then(data => {
      let temp: any = data;
      temp.filter((d: any) => {
        if (d.supervisor?.id == id) {
          this.tecnicosTemporal.push(d);
        }
      })
    })
  }

  llenarTecnicos(idSupervisor: any) {
    this.idSupervisorTemporal = idSupervisor;
    console.log("ID del supervisor === ", idSupervisor)
    this.tecnicosTemporal = []
    this.servicios.obtenerEmpleados().toPromise().then(data => {
      // console.log("Empleados ===  " , data)
      let temp: any = data;
      temp.filter((d: any) => {
        if (d.supervisor == null) {
          this.tecnicosTemporal.push(d);
        }
      })
    })
  }


  asignarTecnico() {
    let idTecnico = this.formAsignarTecnico.controls.idTecnico.value;
    console.log("Tecnico seleccionado === " , idTecnico)
    let supervisor: any;
    let tecnico: any;
    let continuar: boolean = true;

    this.servicios.obtenerEmpleados().toPromise().then(data => {
      let temp: any = data;
      temp.filter((d: any) => {
        console.log(" d === ", d)
        if (d.id == idTecnico) {
          tecnico = d;

        }
      })

      this.servicios.obtenerEmpleados().toPromise().then(data => {
        let temp: any = data;
        temp.filter((d: any) => {
          console.log(" d === ", d)
          if (d.id == this.idSupervisorTemporal) {
            supervisor = d;

          }
        })

        tecnico["supervisor"] = supervisor


        ////////VALIDAR QUE NO TENGA USUARIOS A SU CARGO
        this.servicios.obtenerEmpleados().toPromise().then(data => {
          let temp: any = data;
          temp.filter((d: any) => {
            // console.log(" d === ", d)
            if (d.supervisor?.id == idTecnico) {
              continuar = false;
              this.mensajeError('El empleado seleccionado es un supervisor, no se puede realizar la acción.')
              this.formAsignarTecnico.reset()
            }
          })
          if (continuar) {

            //se consume el servicio
            this.servicios.asignarTecnicos(idTecnico, tecnico).toPromise().then(resp => {
              console.log("Respuesta ==== ", resp)
              this.mensajeExito()
            }).catch(err => {
              console.log("Error ===== ", err)
            });
          }

        })


        //   tecnico["supervisor"]=supervisor

        //   //se consume el servicio
        //   this.servicios.asignarTecnicos(idTecnico, tecnico).toPromise().then( resp =>{
        //     console.log("Respuesta ==== " , resp)
        //     this.mensajeExito()
        //   }).catch( err =>{
        //     console.log("Error ===== " , err)
        //   });
      })

    })



  }


  mensajeExito() {
    Swal.fire({
      title: "Se asignó al técnico con éxito.",
      icon: 'success',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      html: 'Se actualizó con éxito',
    }).then((result) => {
      location.href = 'bandeja'
    });
  }

  mensajeExito2() {
    Swal.fire({
      title: "Se creó la visita y se asignó al técnico con éxito.",
      icon: 'success',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      html: 'Se creó con éxito',
    }).then((result) => {
      location.href = 'bandeja'
    });
  }

  formValid() {
    if (this.formAsignarTecnico.controls.idTecnico.value != null && this.formAsignarTecnico.controls.idTecnico.value != undefined && this.formAsignarTecnico.controls.idTecnico.value != '') {
      return true;
    }
    return false
  }



  mensajeError(texto: any) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: texto,
    })
  }

}
