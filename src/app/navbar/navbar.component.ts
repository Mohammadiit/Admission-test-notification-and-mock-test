import {Component} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {AuthenticationService} from '../authentication/services/authentication.service';
import {Router} from '@angular/router';
import {UserInformation} from '../config/interfaces/user.interface';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from 'firebase';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  user: Observable<UserInformation>;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  isLoggedIn: boolean = false;
  observer: any;

  constructor(private breakpointObserver: BreakpointObserver,
              private  router: Router,
              private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private authenticationService: AuthenticationService
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.authenticationService.isLoggedIn.next(true);
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          this.authenticationService.isLoggedIn.next(false);
          return of(null);
        }
      })
    );
    this.afAuth.auth.onAuthStateChanged
    this.authenticationService.isLoggedIn.subscribe(
      data => {
        console.log(data);
        debugger;
        this.isLoggedIn = data;
      }
    );
    // console.log(this.isLoggedIn);
  }

  routeToLogIn() {
    this.router.navigate(['auth/log-in']);
  }

  routeToSignUp() {
    this.router.navigate(['auth/sign-up']);
  }

  routeToLogOut() {
    this.authenticationService.signOut();
    this.authenticationService.isLoggedIn.next(false);
    this.router.navigate(['']);
  }
}
