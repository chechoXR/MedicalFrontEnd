import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slider,fader } from './route-animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations:[slider, fader]
})
export class AppComponent {
 
  prepareRoute(oulet: RouterOutlet){
    return oulet && oulet.activatedRouteData && oulet.activatedRouteData['animation'];
  }
}
