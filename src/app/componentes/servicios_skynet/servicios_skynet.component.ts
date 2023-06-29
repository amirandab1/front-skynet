import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiciosAppService } from 'src/app/servicios/servicios-app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicios_skynet',
  templateUrl: './servicios_skynet.component.html',
  styleUrls: ['./servicios_skynet.component.css']
})

export class ServiciosSkynetComponent implements OnInit {

  servicios_skynet:any=[]

  constructor( private servicios: ServiciosAppService) { }

  ngOnInit(): void {

    this.servicios.obtenerServicios().toPromise().then( data=>{
      this.servicios_skynet = data
    });

  }
}