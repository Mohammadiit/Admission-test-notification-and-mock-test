import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import * as util from 'util';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserInformation} from '../../../config/interfaces/user.interface';
import {Roles} from '../../../config/enum/default.enum';
import {urlPaths} from '../../../config/constants/defaultConstants';
import {FieldMatcher} from '../../../shared/service/shared.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpData : FormGroup;
  userInformation: UserInformation;
  private matcher;
  constructor(private authService: AuthenticationService,
              private fb: FormBuilder,
              private  router: Router) { }

  ngOnInit() {
    this.setForm();
    this.setCustomValidation();
  }



  private setForm() {
   this.signUpData = this.fb.group({
      fullName: ['',[ Validators.required] ],
      email: ['',[ Validators.required, Validators.email]],
      password: ['',[ Validators.required, Validators.minLength(6)]],
      confirmPassword: ['',[ Validators.required, Validators.minLength(6)
      ,this.passwordMatcher.bind(this)
      ]]
    });
  }

  private passwordMatcher(control: FormControl): { [s: string]: boolean } {
    if (
      this.signUpData &&
      (control.value !== this.signUpData.controls.password.value)
    ) {
      return { passwordNotMatch: true };
    }
    return null;
  }

  private setCustomValidation() {
    this.signUpData.setValidators(this.passwordMatchValidator);
    this.signUpData.updateValueAndValidity();
    this.matcher = new FieldMatcher();

  }
  signUp() {
    console.log(util.inspect(this.signUpData.value));
  }

  passwordMatchValidator(group: FormGroup): any {
    if (group) {
      if (group.get('password').value !== group.get('confirmPassword').value) {
        return { not_matching: true };
      }
    }

    // if(control.value !== this.changePasswordForm.value.newpassword) {
    //   return { notMatching: true };
    // }
    return null;
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
    this.signUpData.reset();
  }

  private registerUser(signUpData: UserInformation) {
    this.authService.signUp(signUpData);
  }

  routeToLogIn() {
    this.router.navigate([urlPaths.Authentication.Signin.url]);
  }


}
