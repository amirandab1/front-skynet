import { Component, OnInit } from '@angular/core';
import { ServiciosAppService } from 'src/app/servicios/servicios-app.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {


  clientes:any=[]; 
  empleados:any=[]; 
  supervisores:any=[]; 
  constructor( private servicios : ServiciosAppService) { }

  ngOnInit(): void {
    this.servicios.obtenerClientes().toPromise().then( data => {
      this.clientes = data;
    })

    this.servicios.obtenerEmpleados().toPromise().then( data => {

      let temp:any = data;
      temp.filter( (d: any) => {
        if( d.supervisor != null){
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

  }

}
