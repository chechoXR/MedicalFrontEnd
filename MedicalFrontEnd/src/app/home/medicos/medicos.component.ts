import {animate, state, style, transition, trigger} from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogBorrarComponent } from '../dialog-borrar/dialog-borrar.component';

export interface medico{
  id:number;
  nombre:String;
  identificacion:String;
  tipoIdentificacion:String;
  numeroTarjetaProfesional:String;
  experiencia:number;
  especialidad:String;
  inicio:String;
  fin: String;
}

var DATA: medico[]=[];

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.sass'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class MedicosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'identificacion','tipoIdentificacion','numeroTarjetaProfesional','experiencia','especialidad','inicio','fin','editar','borrar'];
  dataSource:medico[]= [];

  private url = 'https://medical-backend-web-android.herokuapp.com/web/medicos';

  constructor(private http: HttpClient, public dialog: MatDialog, private snack: MatSnackBar, private router:Router) {
  /*  this.dataSource.push({ id:1, 
                nombre:"Sergio",
                identificacion:"12354679", 
                tipoIdentificacion:"CC",
                numeroTarjetaProfesional:"987654321",
                experiencia:5,
                especialidad:"cardiologo",
                inicio:"8",
                fin:"17"
              });
    */
   }

  ngOnInit(): void {
    this.load();
  }

  async load(){
   
    const result = this.http.get<Array<medico>>(this.url);
    DATA=[];
    result.subscribe((res)=>{
      res.forEach(element => {
        DATA.push(element);   
        DATA.sort((a,b)=>(a.id>b.id)?1:-1);
        this.dataSource = DATA;
      });
    });
    return true;
  }

  editar(id:number){
    this.router.navigate(["editmedico",id]);
  }

  async confirmar(id:number) {
    let resultado = this.dialog.open(DialogBorrarComponent);
    resultado.afterClosed().subscribe(res =>{
      if(res == "true"){
        this.eliminarRegistro(id)
          
        //Sin timeout no actualiza correctamente.
        setTimeout(t =>{
          this.load();
        },600);
        
      }   
    });
  }

    eliminarRegistro(id:number){
      const eliminar = this.http.delete(this.url+"/"+id,{ observe: 'response' });
    
      let result = false;
      eliminar.subscribe(s =>{
        console.log("Success " + s.status);
        result = s.status == 200;
        this.showSnack("Registro eliminado.");
      }, e=>{
        console.log("Error" + e);
        result = false;
        this.showSnack("El registro no existe o ya fue eliminado.");
      });
      return result;
    }

    showSnack(message: string){
      this.snack.open(message,"ok",{duration: 3000});
    }
}
