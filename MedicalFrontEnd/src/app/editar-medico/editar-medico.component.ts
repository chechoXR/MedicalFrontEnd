import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


export interface tipoID{
  id:number,
  tipoIdentificacion:String
}

export interface medico{
  nombre:String,
  identificacion:String, 
  tipoIdentificacion:String,
  numeroTarjetaProfesional:String,
  aniosExperiencia:String,
  especialidad:String,
  inicio:number,
  fin:number
}


@Component({
  selector: 'app-editar-medico',
  templateUrl: './editar-medico.component.html',
  styleUrls: ['./editar-medico.component.sass']
})
export class EditarMedicoComponent implements OnInit {
  id: number;
  medico:medico;
  private sub: any;
  tipoSel;
  errorVisible = false;
  tiposID:tipoID[];

  private url = 'https://medical-backend-web-android.herokuapp.com';


  constructor(private route: ActivatedRoute, private http:HttpClient, private router:Router) { 

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; 
    });

  }

  async ngOnInit():Promise<void> {
    this.cargarTiposID();
    this.load();
  }

  load(){
    const result = this.http.get<medico>(this.url+"/web/medicos/"+this.id,{ observe: 'response' }).toPromise();
        
    var resp = false;

    result.then(res=>{
      this.medico = res.body; 
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

  setValues(){
    
    var nombre = document.getElementById("nombre") as HTMLInputElement;
    var especialidad = document.getElementById("especialidad") as HTMLInputElement;
    //tipoSel
    var id = document.getElementById("id") as HTMLInputElement;
    var tarjeta = document.getElementById("tarjeta") as HTMLInputElement;
    var experiencia = document.getElementById("experiencia") as HTMLInputElement;
    var inicio = document.getElementById("inicio") as HTMLInputElement;
    var fin = document.getElementById("fin") as HTMLInputElement;
    
    
    nombre.value = this.medico.nombre+"";
    especialidad.value = this.medico.especialidad+"";
    id.value = this.medico.identificacion+"";
    tarjeta.value = this.medico.numeroTarjetaProfesional+"";
    experiencia.value = this.medico.aniosExperiencia+"";
    inicio.value = this.medico.inicio+"";
    fin.value = this.medico.fin+"";
    
    var temp: number = +this.medico.tipoIdentificacion;
    
    for(var i=0; i< this.tiposID.length; i++){
      console.log(this.tiposID[i].id == temp);
      if(this.tiposID[i].id == temp)
        this.tipoSel = this.tiposID[i].tipoIdentificacion;
    }

  }

  guardar(){
    

    var nombre = document.getElementById("nombre") as HTMLInputElement;
    var especialidad = document.getElementById("especialidad") as HTMLInputElement;
    //tipoSel
    var id = document.getElementById("id") as HTMLInputElement;
    var tarjeta = document.getElementById("tarjeta") as HTMLInputElement;
    var experiencia = document.getElementById("experiencia") as HTMLInputElement;
    var inicio = document.getElementById("inicio") as HTMLInputElement;
    var fin = document.getElementById("fin") as HTMLInputElement;
/*
    console.log(nombre.value);
    console.log(fechaNacimiento.value);
    console.log(this.tipoSel);
    console.log(id.value);
    console.log(this.epsSel);
    console.log(historia.value);
  */  
    if( nombre.value != "" &&
      especialidad.value != "" &&
      this.tipoSel != undefined &&
      id.value != "" &&
      tarjeta.value != "" &&
      experiencia.value != "" &&
      inicio.value != "" &&
      fin.value != "") {

      

      var tipo = -1;
      for(var i=0; i< this.tiposID.length; i++){
        if(this.tiposID[i].tipoIdentificacion == this.tipoSel)
          tipo = this.tiposID[i].id;
      }
      
      let n :number = Number(experiencia.value);
          n=n+0.0;
          console.log(n);

          const result = this.http.put(this.url+"/web/medicos/"+this.id,{
            
            "nombre":nombre.value,
            "identificacion":id.value, 
            "tipoIdentificacion":tipo,
            "numeroTarjetaProfesional":tarjeta.value,
            "aniosExperiencia":n,
            "especialidad":especialidad.value,
            "inicio":inicio.value,
            "fin":fin.value         

          });

          result.subscribe((res)=>{
            this.router.navigateByUrl("");
          });
      
    }else{
      this.errorVisible = true;
    }



  

}
}