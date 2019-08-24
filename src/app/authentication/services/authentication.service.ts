import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BehaviorSubject, Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {CustomerUserInformation, UserInformation} from '../../config/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public isLoggedIn: BehaviorSubject<boolean> ;

  public logInForm = this.fb.group({
    email: [''],
    password: ['']
  });
  public recoverAccountForm = this.fb.group({
    email: ['']
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
              private afs: AngularFirestore,
              private router: Router) {
    this.isLoggedIn = new BehaviorSubject(false);
  }

  signUp(user: UserInformation) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email,
      user.password)
      .then((accepted) => {
        user.metaData.uid = accepted.user.uid;
         return this.setUserDoc(user); // create initial user document
      })
      .catch(error => this.handleError(error));
  }
  signIn(user: UserInformation) : Observable<any> {
    return new Observable((observer) => {
      this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
        .then((acc) => {
          observer.next(acc);
        })
        .catch((err) => {
          observer.next(err);
        });
    });
  }
  signOut() {
    this.afAuth.auth.signOut();
  }
  private setUserDoc(user) {
    const userRef: AngularFirestoreDocument<UserInformation>
      = this.afs.doc(`users/${user.metaData.uid}`);
    const customData: CustomerUserInformation = {
      uid: user.metaData.uid,
      fullName: user.metaData.fullName,
      email: user.metaData.email,
      role: user.metaData.role,
    };
    const data: UserInformation = {
      email: user.email || null,
      password: user.password,
      metaData: customData
    };
    return userRef.set(data);
  }
  sendPasswordResetEmail(user: UserInformation): Observable<any> {
    return new Observable(observer=>{
      this.afAuth.auth.sendPasswordResetEmail(user.email).then(acc=>{
        observer.next(acc);
      }).catch(err=>{
        observer.next(err);
      });
    });

  }
// If error, console log and notify user
  private handleError(error) {
    console.error(error);
  }
}
