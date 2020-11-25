import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
  
})
export class HomeComponent implements OnInit {
  pacientes:boolean;
  medicos: boolean;
  citas:boolean;

  constructor() { 
    this.pacientes = false;
    this.medicos = false;
    this.citas = false;
  }

  ngOnInit(): void {
  }
  
  click(i:any){
  console.log("asd ",i);

  if(i == 1)
    this.pacientes = !this.pacientes;
  if(i == 2)
    this.medicos = !this.medicos;
  if(i == 1)
    this.citas = !this.citas;
}  
  

}

