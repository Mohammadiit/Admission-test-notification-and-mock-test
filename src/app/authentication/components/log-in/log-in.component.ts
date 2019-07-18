import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import * as util from 'util' // has no default export
import { inspect } from 'util' // or directly

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  logInData = this.authService.logInForm;

  constructor(private authService: AuthenticationService, private  router: Router) { }

  ngOnInit() {
  }
  logIn() {
    console.log(util.inspect(this.logInData.value));
  }
  routeToSignUp() {
    this.router.navigate(['auth/sign-up']);
  }
}
