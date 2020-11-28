import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent implements OnInit {
  title = 'MedicalFrontEnd';
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  goHome(){
    this.router.navigateByUrl("/home");
  }

}
    
