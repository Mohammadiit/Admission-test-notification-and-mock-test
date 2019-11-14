import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {SecurityService} from './security.service';

@Injectable({
  providedIn: 'root'
})
export class ContestRegisteredGuard implements CanActivate {

  constructor(private router: Router, private securityService: SecurityService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree | any {



    return new Observable(observer => {
      console.log(next.url[1]+'     Rouuuuuuuuuuu'+'uuuuuuuuutttttttt     '+
        next.url[1].toString().length+"    "+next.url[1].toString().indexOf('contest')
        +" "+next.url[1].toString().substring(27));

      if(next.url[1].toString().indexOf('contest')>0){
        let contesID = next.url[1].toString().substring(27);


        this.securityService.isRegisteredInContest(contesID).subscribe(res => {
          if (res) {
            observer.next(res);
          }
          else {
            observer.next(false);
            this.router.navigate(['**']);
          }
        })
      }
      else{
        observer.next(true);
      }

    })
  }
  
}
