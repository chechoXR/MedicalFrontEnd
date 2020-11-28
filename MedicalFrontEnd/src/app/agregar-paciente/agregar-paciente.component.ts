import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToolbarComponent } from '../toolbar/toolbar.component';


@Component({
  selector: 'app-agregar-paciente',
  templateUrl: './agregar-paciente.component.html',
  styleUrls: ['./agregar-paciente.component.sass']
})
export class AgregarPacienteComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  
  constructor(private router:Router) {}




  ngOnInit(): void {
    
  }
  


}
