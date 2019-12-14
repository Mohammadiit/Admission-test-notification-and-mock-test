import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {SecurityService} from './security.service';

@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanActivate {
  constructor(private router: Router, private securityService: SecurityService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    return new Observable(observer => {
     console.log(next.url[1]+'     Rouuuuuuuuuuu'+'uuuuuuuuutttttttt     e'+ next.toString())
      this.securityService.isStudent().subscribe(res => {
        if (res) {
          observer.next(res);
        }
        else {
          observer.next(false);
          this.router.navigate(['**']);
        }
      })
    })

  }
  
}
