import { HttpClient, HttpHandler, HttpHeaders, HttpRequest} from '@angular/common/http';
import { AfterViewInit, Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { DialogBorrarComponent } from '../dialog-borrar/dialog-borrar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';




export interface paciente {
  id: number;
  nombre: string;
  fechaNacimiento: Date;
  identificacion: string;
  tipoIdentificacion: string;
  eps: string;
  historiaClinica: string;
}

var DATA: paciente[] = [
];

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.sass'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class PacientesComponent implements AfterViewInit  {
  displayedColumns: string[] = ['id', 'nombre', 'fechaNacimiento', 'identificacion','tipoIdentificacion','eps'];
  dataSource = [];
  expandedElement: paciente | null;
  @ViewChild(MatTable) tabla:MatTable<paciente>;

  private url = 'https://medical-backend-web-android.herokuapp.com/web/pacientes';
  //private url =   'http://192.168.3.17:8080/web/pacientes';
  
  constructor(private http: HttpClient, public dialog: MatDialog, private snack: MatSnackBar) { 
    //DATA.push({id:1, nombre:"pacienteN", fechaNacimiento:new Date(),identificacion:"123",tipoIdentificacion:"cedula",eps:"Sanitas",historiaClinica:"asda"});
    
  }
  
  ngAfterViewInit(): void {
    this.load();
  }

 

   async load(){
   
    const result = this.http.get<Array<paciente>>(this.url);
    DATA=[];
    result.subscribe((res)=>{
      res.forEach(element => {
        DATA.push(element);   
        this.dataSource = DATA;
      });
    });
    return true;
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
