import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiciosAppService } from 'src/app/servicios/servicios-app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})

export class ServiciosComponent implements OnInit {

  visitas:any=[]

  constructor( private servicios: ServiciosAppService) { }

  ngOnInit(): void {

    this.servicios.obtenerServicios().toPromise().then( data=>{
      this.visitas = data
    });

  }
}