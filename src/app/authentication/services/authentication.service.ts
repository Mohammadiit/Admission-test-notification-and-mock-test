import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {UserInformation} from '../../config/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public logInForm = this.fb.group({
    email: [''],
    password: ['']
  });
  public signUpForm = this.fb.group({
    fullName: [''],
    email: [''],
    password: [''],
    confirmPassword: ['']
  });
  user: Observable<UserInformation>;
  constructor(private fb: FormBuilder,
              private afAuth: AngularFireAuth,
              private angularfirestore: AngularFirestore,
              private router: Router ) {
  }

  signUp(userInformation : UserInformation ) {
  return this.afAuth.auth.createUserWithEmailAndPassword(userInformation.email,
    userInformation.password)
    .then(user => {
      return this.setUserDoc(user); // create initial user document
    })
    .catch(error => this.handleError(error) );
}

  private setUserDoc(user) {
    return undefined;
  }

// If error, console log and notify user
  private handleError(error) {
    console.error(error);
  }
}
