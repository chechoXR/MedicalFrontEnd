import { DatePipe } from '@angular/common';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { promise } from 'protractor';



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
  selector: 'app-editar-paciente',
  templateUrl: './editar-paciente.component.html',
  styleUrls: ['./editar-paciente.component.sass']
})

export class EditarPacienteComponent implements OnInit,AfterViewInit {
  paciente:paciente;
  id: number;
  private sub: any;

  tipoSel;
  epsSel;
  errorVisible = false;
  tiposID:tipoID[];
  eps:eps[];
  private url = 'https://medical-backend-web-android.herokuapp.com';
  
  constructor(private route: ActivatedRoute, private http:HttpClient, private router:Router) { 

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    
    
  }
  
  async ngOnInit():Promise<void>{
    
    this.cargarTiposID();
    this.cargarEps();
    this.load();
    
  }
  
  ngAfterViewInit(): void {
    
  }
  
    load(){
    const result = this.http.get<paciente>(this.url+"/web/pacientes/"+this.id,{ observe: 'response' }).toPromise();
        
    var resp = false;

    result.then(res=>{
      this.paciente = res.body; 
      this.setValues();
      resp = true;  
    },e=>{
      this.router.navigateByUrl("notFound");
    });

      

  }
  
  cargarTiposID(){
    
    const result = this.http.get<Array<tipoID>>(this.url+"/tipoIdentificacion");
    this.tiposID = [];
    result.subscribe((res)=>{
      res.forEach(element => {
        this.tiposID.push(element);   
      });
    });
    return true;
  }
  
  cargarEps(){
    
    const result = this.http.get<Array<eps>>(this.url+"/eps");
    this.eps = [];
    result.subscribe((res)=>{
      res.forEach(element => {
        this.eps.push(element);   
      });
    });
    return true;
  }
  
  setValues(){
    
    var nombre = document.getElementById("nombre") as HTMLInputElement;
    var fechaNacimiento = document.getElementById("fecha") as HTMLInputElement;
    
    var id = document.getElementById("id") as HTMLInputElement;
    
    var historia = document.getElementById("historia") as HTMLInputElement;
    
    
    nombre.value = this.paciente.nombre+"";
    
    var pipe = new DatePipe("en-TT");
    fechaNacimiento.value = ""+ pipe.transform(new Date(this.paciente.fechaNacimiento),"dd/MM/yyyy");
    
    var temp: number = +this.paciente.tipoIdentificacion;
    
    for(var i=0; i< this.tiposID.length; i++){
      if(this.tiposID[i].id == temp)
        this.tipoSel = this.tiposID[i].tipoIdentificacion;
    }

    id.value = this.paciente.identificacion+"";

    var temp1: number = +this.paciente.eps;
    for(var j=0; j< this.eps.length; j++){
      if(this.eps[j].id == temp1)
        this.epsSel = this.eps[j].eps  ;
    }


    historia.value = this.paciente.historiaClinica+"";
    

  }

  guardar(){
    

    var nombre = document.getElementById("nombre") as HTMLInputElement;
    var fechaNacimiento = document.getElementById("fecha") as HTMLInputElement;
    
    var id = document.getElementById("id") as HTMLInputElement;
    
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
      console.log("fec "+fechaNacimiento.value);
      const fec = new Date();
      var fechaValores = fechaNacimiento.value.split("/",3);
      var temp: number=+fechaValores[0];
      fec.setDate(temp);
      
      var temp: number=+fechaValores[1];
      fec.setMonth(temp-1);

      var temp: number=+fechaValores[2];
      fec.setFullYear(temp);

      fec.setUTCHours(0,0,0,0);
      //console.log("fec "+this.tipoSel);

      var tipo = -1;
      for(var i=0; i< this.tiposID.length; i++){
        if(this.tiposID[i].tipoIdentificacion == this.tipoSel)
          tipo = this.tiposID[i].id;
      }
      
      var Eps =-1;
      for(var j=0; j< this.eps.length; j++){
        if(this.eps[j].eps == this.epsSel)
          Eps = this.eps[j].id;
      }
      console.log(tipo + " -> " + Eps);
      const result = this.http.put(this.url+"/web/pacientes/"+this.id,{
        "nombre": nombre.value,
        "fechaNacimiento": fec.toISOString(),
        "identificacion": id.value,
        "tipoIdentificacion": tipo,
        "eps":Eps,
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
