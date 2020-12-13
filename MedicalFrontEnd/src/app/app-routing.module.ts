import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AgregarPacienteComponent } from './agregar-paciente/agregar-paciente.component';
import { EditarPacienteComponent } from './editar-paciente/editar-paciente.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AgregarMedicoComponent } from './agregar-medico/agregar-medico.component';
import { EditarMedicoComponent } from './editar-medico/editar-medico.component';
import { AgregarCitaComponent } from './agregar-cita/agregar-cita.component';

const routes:Routes =[
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent,data:{animation:'isLeft'}},
  {path: 'paciente', component: AgregarPacienteComponent,data:{animation:'isRight'}},
  {path: 'medico', component: AgregarMedicoComponent,data:{animation:'isRight'}},
  {path: 'cita', component: AgregarCitaComponent,data:{animation:'isRight'}},
  {path: 'editpaciente/:id', component: EditarPacienteComponent,data:{animation:'isRight'}},
  {path: 'editmedico/:id', component: EditarMedicoComponent,data:{animation:'isRight'}},
  {path: 'notFound', component: NotFoundComponent},
  {path: '**', component: NotFoundComponent}

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
