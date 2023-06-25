import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//servicios
import { ServiciosAppService } from './servicios/servicios-app.service';
import { BandejaComponent } from './componentes/bandeja/bandeja.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { EmpleadosComponent } from './componentes/empleados/empleados.component';
import { SupervisoresComponent } from './componentes/supervisores/supervisores.component';
import { VisitasComponent } from './componentes/visitas/visitas.component';
import { InicioComponent } from './componentes/inicio/inicio.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BandejaComponent,
    ClientesComponent,
    EmpleadosComponent,
    SupervisoresComponent,
    VisitasComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    ServiciosAppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
