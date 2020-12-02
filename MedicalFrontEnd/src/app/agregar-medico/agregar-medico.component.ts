import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

export interface tipoID{
  id:number,
  tipoIdentificacion:String
}

@Component({
  selector: 'app-agregar-medico',
  templateUrl: './agregar-medico.component.html',
  styleUrls: ['./agregar-medico.component.sass']
})
export class AgregarMedicoComponent implements AfterViewInit {
  
  tipoSel;
  errorVisible = false;
  tiposID:tipoID[]=[];

  private url = 'https://medical-backend-web-android.herokuapp.com';

  constructor(private router:Router, private http:HttpClient, private dialog:MatDialog) { }


  ngAfterViewInit(): void {
    this.cargarTiposID();
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
  
  async guardar(){

    var nombre = document.getElementById("nombre") as HTMLInputElement;
    var especialidad = document.getElementById("especialidad") as HTMLInputElement;
    //tipoSel
    var id = document.getElementById("id") as HTMLInputElement;
    var tarjeta = document.getElementById("tarjeta") as HTMLInputElement;
    var experiencia = document.getElementById("experiencia") as HTMLInputElement;
    var inicio = document.getElementById("inicio") as HTMLInputElement;
    var fin = document.getElementById("fin") as HTMLInputElement;
   
    if( nombre.value != "" &&
        especialidad.value != "" &&
        this.tipoSel != undefined &&
        id.value != "" &&
        tarjeta.value != "" &&
        experiencia.value != "" &&
        inicio.value != "" &&
        fin.value != ""){


          const result = this.http.post(this.url+"/web/medicos",{
            
            "nombre":nombre.value,
            "identificacion":id.value, 
            "tipoIdentificacion":this.tipoSel,
            "numeroTarjetaProfesional":tarjeta.value,
            "experiencia":experiencia.value,
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
