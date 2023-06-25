import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ServiciosAppService {

  rutaMicros = environment.rutaMicros;
  header = new HttpHeaders().set('Type-content', 'application/json')

  constructor( private http: HttpClient ){
      console.log("Si se está llegando a los servicios")
  }

  datosCorrectos(user:string, pass:string){

      return (user == 'admin' && pass == 'admin') ? true : false;
  }

  //estructura para consumir get - EJEMPLO
  obtener(){
      return this.http.get(this.rutaMicros+'/beneficio/farmer/listar', { headers: this.header});
  }

  //estructura para consumir post - EJEMPLO 
  crear( variables : any): Observable<any>{
      return this.http.post(environment.rutaMicros+"/Agricultor/create/transport", variables)
  }

  //estructura para consumir put - EJEMPLO
  actualizar(placa:string, variables:any): Observable<any>{ 
      return this.http.put(environment.rutaMicros+"/beneficio/updateTransport/"+placa , variables) ///, { headers: this.header})
  }


    //obtener empleados registrados
    obtenerEmpleados(){
        return this.http.get(this.rutaMicros+'empleados', { headers: this.header});
    }

    obtenerSupervisores(){
        return this.http.get(this.rutaMicros+'empleados', { headers: this.header});
    }

    obtenerClientes(){
        return this.http.get(this.rutaMicros+'clientes', { headers: this.header});
    }

    asignarTecnicos(id:any, variables: any): Observable<any>{ 
        return this.http.put(environment.rutaMicros+"empleado/"+id , variables) ///, { headers: this.header})
    }


    crearEmpleado( variables : any): Observable<any>{
        return this.http.post(environment.rutaMicros+"empleado/", variables)
    }

    obtenerServicios(){
        return this.http.get(this.rutaMicros+'servicios', { headers: this.header});
    }

    obtenerVisitas(){
        return this.http.get(this.rutaMicros+'visitas', { headers: this.header});
    }

    crearVisita( variables : any): Observable<any>{
        return this.http.post(environment.rutaMicros+"visita/", variables)
    }

    crearCliente( variables : any): Observable<any>{
        return this.http.post(environment.rutaMicros+"cliente/", variables)
    }
}