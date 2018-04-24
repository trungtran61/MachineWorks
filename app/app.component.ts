import { Component } from '@angular/core';
import { AppUserAuth } from './security/app-user-auth';
import { SecurityService } from './security/security.service';
import { Router } from '@angular/router';

@Component({
  selector: 'mw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = "MachineWork"  
  securityObject: AppUserAuth = null;

  constructor(private securityService: SecurityService, private router: Router) {
    this.securityObject = securityService.securityObject;
    if (localStorage.getItem('securityObject'))
    {
      this.securityObject = securityService.getSecurityObject();    
    } 
  }

  logout(): void {
    console.log ('logout');
    this.securityService.logout();   
  }   
}
