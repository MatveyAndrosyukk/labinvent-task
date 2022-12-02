import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-sensors-page',
  templateUrl: './sensors-page.component.html',
  styleUrls: ['./sensors-page.component.css']
})
export class SensorsPageComponent {
  constructor(private router: Router) {
  }

  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('roles')
    this.router.navigate(['/login'])
  }
}
