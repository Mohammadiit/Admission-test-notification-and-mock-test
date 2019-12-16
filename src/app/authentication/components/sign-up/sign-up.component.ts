import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import * as util from 'util';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserInformation} from '../../../config/interfaces/user.interface';
import {Roles} from '../../../config/enum/default.enum';
import {urlPaths} from '../../../config/constants/defaultConstants';
import {FieldMatcher, SharedService} from '../../../shared/service/shared.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpData : FormGroup = null;
  userInformation: UserInformation;
  private matcher;
  constructor(private authService: AuthenticationService,
              private sharedService: SharedService,
              private fb: FormBuilder,
              private  router: Router) {
    // this.signUpData.reset();
  }

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

  onSubmit(event: Event) {
    event.preventDefault();

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

    // this.router.navigate([urlPaths.Authentication.Signup]);

  }

  private registerUser(signUpData: UserInformation) {
    this.router.navigate(['/auth/log-in']);
    this.authService.signUp(signUpData).subscribe(res =>{
      if (res ) {
        this.sharedService.openSnackBarLattest('Verification email has been sent. Please check', 'done');
          console.log(res);
        this.router.navigate(['/auth/log-in']);

      }
      else {
        this.sharedService.openSnackBarLattest('Verification email has been sent. Please check', 'done');

        this.router.navigate(['/auth/log-in']);
      }

    });
  }

  routeToLogIn() {
    this.router.navigate([urlPaths.Authentication.Signin.url]);
  }

  backToHome() {
    this.router.navigate(['']);

  }

}
