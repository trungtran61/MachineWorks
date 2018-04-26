import { Component, OnInit } from '@angular/core';
import { SecurityUser } from './security-user';
import { SecurityUserAuth } from './security-user-auth';
import { SecurityService } from './security.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: SecurityUser = new SecurityUser();
  securityObject: SecurityUserAuth = null;
  returnUrl: string;
  
  constructor(private securityService: SecurityService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');   
  }  

  login() { 
    this.securityService.login(this.user)
      .subscribe(resp => { 
        this.securityObject = resp;        
            
        if (this.returnUrl) {
          this.router.navigateByUrl(this.returnUrl);
        }
        else {
          this.router.navigateByUrl('/dashboard');
        }        
      });
  }  
}