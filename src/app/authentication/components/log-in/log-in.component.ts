import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import * as util from 'util'; // has no default export
import { inspect } from 'util';
import {first} from 'rxjs/operators';
import {urlPaths} from '../../../config/constants/defaultConstants';
import {SecurityService} from '../../../shared/service/security-service/security.service'; // or directly

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  logInData = this.authService.logInForm;

  constructor(private authService: AuthenticationService, private  router: Router,
              private securityService: SecurityService
              ) { }

  ngOnInit() {
  }
  logIn() {
    console.log(util.inspect(this.logInData.value));
    this.authService.signIn(this.logInData.value).pipe(first()).subscribe((res) => {
      if (res && res.code) {
         console.log(res.code);
      } else {
        this.authService.isLoggedIn.next(true);
        this.AdminCheck();
        this.StudentCheck();
        this.router.navigate(['']);

      }
    });
  }
  private StudentCheck() {
    this.securityService.isStudent().subscribe(res => {
      if (res) {
        console.log("         aaaaaaaaaaaaa  Student bbbbbbbbbbb   ");
      }
    })
  }
  AdminCheck(){
    this.securityService.isAdmin().subscribe(res => {
      if (res) {
        console.log("         aaaaaaaaaaaaa  Admin bbbbbbbbbbb   ");
      }
    })
  }

  routeToSignUp() {
    this.router.navigate(['auth/sign-up']);
  }

  routeToRecoverAccount() {
    this.router.navigate([urlPaths.Authentication.AccountRecovery.url]);
  }


}
