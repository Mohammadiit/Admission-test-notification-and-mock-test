import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import * as util from 'util';
import {FormGroup} from '@angular/forms';
import {UserInformation} from '../../../config/interfaces/user.interface';
import {Roles} from '../../../config/enum/default.enum';
import {urlPaths} from '../../../config/constants/defaultConstants';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpData = this.authService.signUpForm;
  userInformation: UserInformation;
  constructor(private authService: AuthenticationService, private  router: Router) { }

  ngOnInit() {
  }
  signUp() {
    console.log(util.inspect(this.signUpData.value));
  }
  onSubmit() {
    this.userInformation = {
      email: this.signUpData.value.email,
      password: this.signUpData.value.password,
      metaData: {
        fullName: this.signUpData.value.fullName,
        email: this.signUpData.value.email,
        role: Roles.Customer ,
      }
    };
    this.registerUser(this.userInformation);
    this.router.navigate([urlPaths.Authentication.Signup]);
  }

  private registerUser(signUpData: UserInformation) {
    this.authService.signUp(signUpData);
  }

  routeToLogIn() {
    this.router.navigate([urlPaths.Authentication.Signin.url]);
  }
}
