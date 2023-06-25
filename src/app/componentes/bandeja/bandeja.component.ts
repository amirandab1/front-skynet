import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bandeja',
  templateUrl: './bandeja.component.html',
  styleUrls: ['./bandeja.component.css']
})
export class BandejaComponent implements OnInit {


  mostrarEmpleado= false;
  mostrarCliente= false;
  mostrarInicio=true;
  mostrarSupervisor=false;
  mostrarVisitas=false;

  constructor() { }

  ngOnInit(): void {
  }

  mostrar(elemento:any){
    console.log("que hay en elemento == " , elemento);
    if(elemento == 'Clientes'){
      this.mostrarCliente = true;
      this.mostrarEmpleado = false;
      this.mostrarInicio = false;
      this.mostrarVisitas = false;
      this.mostrarSupervisor = false;
    }
    else if(elemento == 'Empleados'){
      this.mostrarEmpleado = true;
      this.mostrarCliente = false;
      this.mostrarInicio = false;
      this.mostrarVisitas = false;
      this.mostrarSupervisor = false;
    }
    else if(elemento == 'Inicio'){
      this.mostrarEmpleado = false;
      this.mostrarCliente = false;
      this.mostrarInicio = true;
      this.mostrarVisitas = false;
      this.mostrarSupervisor = false;
    }
    else if(elemento == 'Supervisores'){
      this.mostrarEmpleado = false;
      this.mostrarCliente = false;
      this.mostrarInicio = false;
      this.mostrarVisitas = false;
      this.mostrarSupervisor = true;
    }
    else if(elemento == 'Visitas'){
      this.mostrarEmpleado = false;
      this.mostrarCliente = false;
      this.mostrarInicio = false;
      this.mostrarVisitas = true;
      this.mostrarSupervisor = false;
    }
  }
}
