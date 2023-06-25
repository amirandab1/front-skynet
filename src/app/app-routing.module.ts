import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { BandejaComponent } from './componentes/bandeja/bandeja.component';

const routes: Routes = [
{
    path: 'bandeja',
    component: BandejaComponent
  },
  {
      path: 'login',
      component: LoginComponent
    }
  // {
  //   path: 'login',
  //   component: LoginComponent
  // },{
  //   path: 'bandeja',
  //   component: BandejaComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
