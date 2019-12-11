import {Component} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable, of} from 'rxjs';
import {first, map, switchMap, tap} from 'rxjs/operators';
import {AuthenticationService} from '../authentication/services/authentication.service';
import {Router} from '@angular/router';
import {UserInformation} from '../config/interfaces/user.interface';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from 'firebase';
import {SecurityService} from '../shared/service/security-service/security.service';
import {admissionHelperConst} from '../config/constants/defaultConstants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  user: Observable<UserInformation>;
  isExpanded: boolean = false;
  sidebar = [];
  selectedRow: number;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  isLoggedIn: boolean ;
  observer: any;

  checkIfLogin() {
    this.logIn().pipe(
      tap(user => {
        if (user) {
          // do something
          this.isLoggedIn = true;
          console.log(this.isLoggedIn);
        } else {
          // do something else
          let i=0;
          this.sideBarPush('Anonymous');
          this.isLoggedIn = false;
          console.log(this.isLoggedIn);
        }
      })
    )
      .subscribe();
  }

  constructor(private breakpointObserver: BreakpointObserver,
              private  router: Router,
              private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private authenticationService: AuthenticationService,
              private securityService:SecurityService
  ) {
    this.checkIfLogin();
    // this.user = this.afAuth.authState.pipe(
    //   switchMap(user => {
    //     if (user) {
    //       this.authenticationService.isLoggedIn.next(true);
    //       return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
    //     } else {
    //       this.authenticationService.isLoggedIn.next(false);
    //       return of(null);
    //     }
    //   })
    // );
    this.afAuth.auth.onAuthStateChanged
    // this.authenticationService.isLoggedIn.subscribe(
    //   applicationStarts => {
    //     console.log(applicationStarts);
    //     this.isLoggedIn = applicationStarts;
    //   }
    // );


  this.makeSideBar();

  }
  route(url) {
    console.log(url);
    this.router.navigate([ url ]).then(res=>{

    });
  }
  selectRow(index) {
    this.selectedRow = index;
  }
  makeSideBar() {
    let admin;

    console.log("LLLLLgogggggggg    " + this.isLoggedIn);
    // if(this.isLoggedIn){
      this.securityService.isAdmin().subscribe((res)=>{
        if(res){
          this.sideBarPush('Admin');
        }
        else{
          this.sideBarPush('Student');
        }
      })
    // }
    // else {
    //   this.sideBarPush('Anonymous');
    // }



  }
  private sideBarPush(position) {
    admissionHelperConst.sideBar.forEach((item)=>{
      item.role.forEach((role)=>{
        if(role == position){
          this.sidebar.push(item);
        }

      })
    })
  }
  logIn() {
    return this.afAuth.authState.pipe(first());
  }
  routeToLogIn() {
    this.router.navigate(['auth/log-in']);
  }

  routeToSignUp() {
    this.router.navigate(['auth/sign-up']);
  }

  routeToLogOut() {
    this.authenticationService.signOut();
    // this.authenticationService.isLoggedIn.next(false);
    this.router.navigate(['auth/log-in']);
  }


}
