import { Component, HostListener  } from '@angular/core';
import { SecurityService } from './security/security.service';
import { Router } from '@angular/router';
import { SecurityUserAuth } from './security/security';

@Component({
  selector: 'mw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @HostListener("window:onbeforeunload",["$event"])
  title: string = "MachineWork"  
  securityObject: SecurityUserAuth = null;

  constructor(private securityService: SecurityService, private router: Router) {
    this.securityObject = securityService.securityObject;
    if (localStorage.getItem('securityObject'))
    {
      this.securityObject = securityService.getSecurityObject();    
      console.log (this.securityObject);
    } 
  }

  clearLocalStorage(event){
    localStorage.clear();
}

  logout(): void {    
    this.securityService.logout();   
  }   
}
