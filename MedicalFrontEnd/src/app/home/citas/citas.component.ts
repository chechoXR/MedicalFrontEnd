import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

export interface cita{
  id:number;
  pacienteId:string;
  medicoId:string;
  inicio:Date;
  fin:Date;
}
var DATA: cita[]=[];
@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.sass']
})
export class CitasComponent implements OnInit {
  displayedColumns: string[] = ['id', 'paciente', 'medico','inicio','fin'];
  dataSource:cita[]= [];
  private url = 'https://medical-backend-web-android.herokuapp.com/web/citas';
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.load();
  }

  async load(){
   
    const result = this.http.get<Array<cita>>(this.url);
    DATA=[];
    result.subscribe((res)=>{
      res.forEach(element => {
        DATA.push(element);   
        DATA.sort((a,b)=>(a.inicio>b.inicio)?1:-1);
        this.dataSource = DATA;
      });
    });
    return true;
  }

}
