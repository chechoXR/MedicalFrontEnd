import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface paciente {
  id: number,
  nombre: String,
  fechaNacimiento: Date,
  identificacion: String,
  tipoIdentificacion: String,
  historiaClinica: String
  eps: String
}
export interface medico {
  id: number,
  nombre: String,
  identificacion: String,
  tipoIdentificacion: String,
  numeroTarjetaProfesional: String,
  aniosExperiencia: String,
  especialidad: String,
  inicio: number,
  fin: number
}
export interface cita {
  id: number;
  pacienteId: string;
  medicoId: string;
  inicio: string;
  fin: string;
}

@Component({
  selector: 'app-agregar-cita',
  templateUrl: './agregar-cita.component.html',
  styleUrls: ['./agregar-cita.component.sass']
})
export class AgregarCitaComponent implements OnInit {
  errorVisible = false;
  pacientes: paciente[];
  medicos: medico[];
  pacienteSel;
  medicoSel;
  private url = 'https://medical-backend-web-android.herokuapp.com';

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.cargarPacientes();
    this.cargarMedicos();
  }

  cargarPacientes() {
    const result = this.http.get<Array<paciente>>(this.url + "/web/pacientes");
    this.pacientes = [];
    result.subscribe((res) => {
      res.forEach(element => {
        this.pacientes.push(element);
      });
    });
    return true;
  }

  cargarMedicos() {
    const result = this.http.get<Array<medico>>(this.url + "/web/medicos");
    this.medicos = [];
    result.subscribe((res) => {
      res.forEach(element => {
        this.medicos.push(element);
      });
    });
    return true;
  }

  guardar() {

    var diaInicio = document.getElementById("diaInicio") as HTMLInputElement;
    var horaInicio = document.getElementById("horaInicio") as HTMLInputElement;
    
    if (this.pacienteSel != undefined && this.medicoSel != undefined && diaInicio.value != "" && horaInicio.value != "") {
      
      const inicio = new Date();
      const fin = new Date();
      var fechaValores = diaInicio.value.split("/", 3);
      
      var temp: number = +fechaValores[0];
      inicio.setDate(temp);
      fin.setDate(temp);

      var temp: number = +fechaValores[1];
      inicio.setMonth(temp - 1);
      fin.setMonth(temp - 1);

      var temp: number = +fechaValores[2];
      inicio.setFullYear(temp);
      fin.setFullYear(temp);

      var formato = horaInicio.value.split(" ", 2);
      var tiempo = formato[0].split(":", 2);

      var hora: number = +tiempo[0];
      var minutos: number = +tiempo[1];

      if (formato[1] == "PM")
        hora += 12;
      
      inicio.setUTCHours(hora, minutos, 0, 0);
      fin.setUTCHours(hora+1,minutos,0,0);

      console.log(inicio.toISOString());

      let pacienteID: number;
      let medicoID: number;

      
      this.http.post<cita>(this.url+"/web/citas",{
          "pacienteId":this.pacienteSel,
          "medicoId":this.medicoSel,
          "inicio": inicio.toISOString(),
          "fin":fin.toISOString()
        }).subscribe(res=>{
          this.router.navigateByUrl("/home");
        },err=>{
          console.log(err);
          alert("No fue posible crear la cita.")
        });


    }
    else {
      alert("Error!\nPor favor revisa los campos e intenta nuevamente.");
    }
  }
}
