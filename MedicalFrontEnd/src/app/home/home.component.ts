import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { PacientesComponent } from './pacientes/pacientes.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
   
})
export class HomeComponent implements OnInit {
  pacientes:boolean=true;
  medicos: boolean=true;
  citas:boolean=true;
  private urlPacientes = 'https://medical-backend-web-android.herokuapp.com/web/pacientes';

  constructor() { 
    this.pacientes = true;
    this.medicos = true;
    this.citas = true ;
  }

  ngOnInit(): void {
    this.pacientes = false;
    this.medicos = false;
    this.citas = false;
  }
  
  click(i:number){
  
  if(i == 1){
    this.pacientes = !this.pacientes;
    this.medicos = false;
    this.citas = false;
  }
  if(i == 2){
    this.pacientes = false;
    this.medicos = !this.medicos;
    this.citas = false;
  }
  if(i == 3){
    this.pacientes = false;
    this.medicos = false;  
    this.citas = !this.citas;
  }
    
}  
  
agregarPaciente(){
  
}

}

