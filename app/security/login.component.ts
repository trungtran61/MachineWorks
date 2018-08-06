import { Component, OnInit } from '@angular/core';
import { SecurityUser } from './security-user';
import { SecurityService } from './security.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SecurityUserAuth, UserAuthRequest } from './security';

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
    // for testing
    this.user.userName = 'TienPhan';
    this.user.password = 'Password';
    //
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');       
  }  

  login() {         
    this.securityService.login(this.user)
    .subscribe(resp => {
      this.securityObject = resp;
      if (this.returnUrl) {
        console.log(this.securityObject);
        this.router.navigateByUrl(this.returnUrl);
      }
      else {
        this.router.navigateByUrl('/dashboard');        
      }  
    },
      () => {
        // Initialize security object to display error message
        this.securityObject = new SecurityUserAuth();
      });
    
  }  
}