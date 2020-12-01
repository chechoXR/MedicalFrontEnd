import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {ToolbarComponent } from './toolbar/toolbar.component';
import {MatCardModule} from '@angular/material/card';
import {PacientesComponent } from './home/pacientes/pacientes.component';
import {MatNativeDateModule, MatRippleModule, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {LayoutModule} from '@angular/cdk/layout';
import {FlexLayoutModule} from '@angular/flex-layout';

import { DialogBorrarComponent } from './home/dialog-borrar/dialog-borrar.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AgregarPacienteComponent } from './agregar-paciente/agregar-paciente.component';
import { EditarPacienteComponent } from './editar-paciente/editar-paciente.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    PacientesComponent,
    DialogBorrarComponent,
    AgregarPacienteComponent,
    EditarPacienteComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatRippleModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    AppRoutingModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    LayoutModule,
    FlexLayoutModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path:"home",
        component: HomeComponent
      },
      {
        path:"paciente",
        component: AgregarPacienteComponent
      },
      {
       path: '',
       redirectTo: '/home',
       pathMatch: 'full'
      }
    ])
  ],
  providers: [
    {provide:MAT_DATE_LOCALE, useValue:'sp-CO'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
