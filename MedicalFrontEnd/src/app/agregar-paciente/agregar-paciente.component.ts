import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToolbarComponent } from '../toolbar/toolbar.component';

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
  nombre = new FormControl('', [Validators.required]);
  fecha = new FormControl('',[Validators.required]);
  tipoID = new FormControl('',[Validators.required]);
  id = new FormControl('',[Validators.required]);
  epsval = new FormControl('',[Validators.required]);
  historia = new FormControl('',[Validators.required]);

  tiposID=[];
  eps = [];

  private url = 'https://medical-backend-web-android.herokuapp.com';
  

  constructor(private router:Router, private http:HttpClient) {}

  ngAfterViewInit(): void {
    this.cargarTiposID();
    this.cargarEps();
  }
  

  async cargarTiposID(){
   
    const result = this.http.get<Array<tipoID>>(this.url+"/tipoIdentificacion");
    this.tiposID = [];
    result.subscribe((res)=>{
      res.forEach(element => {
        this.tiposID.push(element.tipoIdentificacion);   
      });
    });
    return true;
  }

  async cargarEps(){
   
    const result = this.http.get<Array<eps>>(this.url+"/eps");
    this.eps = [];
    result.subscribe((res)=>{
      res.forEach(element => {
        this.eps.push(element.eps);   
      });
    });
    return true;
  }

  guardar(){
    var nombre = document.getElementById("nombre") as HTMLInputElement;
    var fechaNacimiento = document.getElementById("fecha") as HTMLInputElement;
    var tipoID = document.getElementById("tipoID") as HTMLSelectElement;
    var id = document.getElementById("id") as HTMLInputElement;
    var eps = document.getElementById("eps") as HTMLSelectElement;
    var historia = document.getElementById("historia") as HTMLInputElement;

    console.log(nombre.value);
    console.log(fechaNacimiento);
    console.log(tipoID.options);
    console.log(id.value);
    console.log(eps.selectedOptions);
    console.log(historia.value);


    /*
    const result = this.http.post(this.url+"/web/pacientes",{

    });
    
    this.router.navigateByUrl("");
*/
  }


}
