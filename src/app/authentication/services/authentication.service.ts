import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
    email: ['',[ Validators.required, Validators.email]],
    password: ['',[ Validators.required]]
  });
  public recoverAccountForm = this.fb.group({
    email: ['',[ Validators.required, Validators.email]]
  });
  public signUpForm = this.fb.group({
    fullName: ['',[ Validators.required] ],
    email: ['',[ Validators.required]],
    password: ['',[ Validators.required, Validators.min(6)]],
    confirmPassword: ['',[ Validators.required, Validators.min(6)]]
  });
  user: Observable<UserInformation>;

  constructor(private fb: FormBuilder,
              private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {
    this.isLoggedIn = new BehaviorSubject(true);

  }

  signUp(user: UserInformation) {
    return new Observable((observer) => {
      this.afAuth.auth.createUserWithEmailAndPassword(user.email,
        user.password)
        .then((accepted) => {
          this.afAuth.auth.currentUser.sendEmailVerification();
          user.metaData.uid = accepted.user.uid;
          this.setUserDoc(user); // create initial user document
           this.router.navigate(['/auth/log-in']);
          observer.next(accepted);
        })
        .catch((error) => {
          this.handleError(error);
          // this.router.navigate(['/auth/log-in']);
          observer.next(error);

        });
    });

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
    return new Observable(observer=> {
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
