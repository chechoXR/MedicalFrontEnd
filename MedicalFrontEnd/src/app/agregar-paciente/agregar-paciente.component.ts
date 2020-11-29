
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { MatDialog } from '@angular/material/dialog';

export interface paciente{
  id:number,
  nombre:String,
  fechaNacimiento:Date,
  identificacion:String,
  tipoIdentificacion:String,
  historiaClinica: String
  eps:String
}

export interface tipoID{
  id:number,
  tipoIdentificacion:String
}

export interface eps{
  id:number,
  eps:String
}


@Component({
  selector: 'app-agregar-paciente',
  templateUrl: './agregar-paciente.component.html',
  styleUrls: ['./agregar-paciente.component.sass']
})
export class AgregarPacienteComponent implements AfterViewInit {
  

  tipoSel;
  epsSel;
  errorVisible = false;
  tiposID=[];
  eps = [];

  private url = 'https://medical-backend-web-android.herokuapp.com';
  

  constructor(private router:Router, private http:HttpClient, private dialog:MatDialog) {}

  ngAfterViewInit(): void {
    this.cargarTiposID();
    this.cargarEps();
  }
  

  async cargarTiposID(){
   
    const result = this.http.get<Array<tipoID>>(this.url+"/tipoIdentificacion");
    this.tiposID = [];
    result.subscribe((res)=>{
      res.forEach(element => {
        this.tiposID.push(element);   
      });
    });
    return true;
  }

  async cargarEps(){
   
    const result = this.http.get<Array<eps>>(this.url+"/eps");
    this.eps = [];
    result.subscribe((res)=>{
      res.forEach(element => {
        this.eps.push(element);   
      });
    });
    return true;
  }

  async guardar(){
    var nombre = document.getElementById("nombre") as HTMLInputElement;
    var fechaNacimiento = document.getElementById("fecha") as HTMLInputElement;
    var tipoID = document.getElementById("tipoID") as HTMLSelectElement;
    var id = document.getElementById("id") as HTMLInputElement;
    var eps = document.getElementById("eps") as HTMLSelectElement;
    var historia = document.getElementById("historia") as HTMLInputElement;
/*
    console.log(nombre.value);
    console.log(fechaNacimiento.value);
    console.log(this.tipoSel);
    console.log(id.value);
    console.log(this.epsSel);
    console.log(historia.value);
  */  
    if(nombre.value != "" && fechaNacimiento.value != "" && this.tipoSel != undefined && id.value !="" && this.epsSel != undefined && historia.value != "") {
      const fec = new Date(fechaNacimiento.value);
      //console.log("fec "+fec.toISOString());

      
      const result = this.http.post(this.url+"/web/pacientes",{
        "nombre": nombre.value,
        "fechaNacimiento": fec.toISOString(),
        "identificacion": id.value,
        "tipoIdentificacion": this.tipoSel,
        "eps":this.epsSel,
        "historiaClinica":historia.value
      });

      result.subscribe((res)=>{
        this.router.navigateByUrl("");
      });
      
      
    }else{
      this.errorVisible = true;
    }

  }


}
