import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {urlPaths} from '../../../config/constants/defaultConstants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private af: AngularFireAuth, private router: Router) {}

  canActivate(): Observable<boolean> {
    return new Observable(observer => {
      this.af.authState.subscribe(res => {
        if (res) {
          observer.next(true);
        }
        else if (!res) {
          observer.next(false);
          this.router.navigate(['**']);
        }
      })
    })
  }
  
}
