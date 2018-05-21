import { Component, OnInit } from '@angular/core';
import { SecurityUserAuth } from '../security/security';
import { SecurityService } from '../security/security.service';

@Component({
  selector: 'mw-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  securityObject: SecurityUserAuth = null;
  constructor( private securityService: SecurityService ) { }

  ngOnInit() {
   this.securityObject = this.securityService.getSecurityObject();
  }
}
