import { ServiciosAppService } from 'src/app/servicios/servicios-app.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visitas',
  templateUrl: './visitas.component.html',
  styleUrls: ['./visitas.component.css']
})
export class VisitasComponent implements OnInit {

  visitas:any=[]

  constructor( private servicios: ServiciosAppService) { }

  ngOnInit(): void {

    this.servicios.obtenerVisitas().toPromise().then( data=>{
      this.visitas = data
    });

  }


  formatoFecha(fecha:any){
    let temp = fecha.split('-'); //2023-06-22 
    return temp[2]+'-'+temp[1]+'-'+temp[0]
  }
}
