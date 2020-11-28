import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AgregarPacienteComponent } from './agregar-paciente/agregar-paciente.component';

const routes:Routes =[
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent,data:{animation:'isLeft'}},
  {path: 'paciente', component: AgregarPacienteComponent,data:{animation:'isRight'}}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes), CommonModule
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
