import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {first, switchMap} from 'rxjs/operators';
import {QueryServiceService} from '../query-service.service';
import {CustomerUserInformation} from '../../../config/interfaces/user.interface';
import {Roles} from '../../../config/enum/default.enum';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private query: QueryServiceService) { }

  checkAuthorization(user: CustomerUserInformation, isRoleValid: string): boolean {
    if (!user) return false;
    // for (const role of user.role) {
      if (user.role == isRoleValid) {
        return true;
      }
    // }
    return false;
  }

  matchAdmin(user: CustomerUserInformation): boolean {
    return this.checkAuthorization(user, Roles.Admin);
  }
  isAdmin(): Observable<boolean>{
    return new Observable((observer) => {
      this.query
        .getLoggedInUserID()
        .pipe(
          switchMap((res) => {
            return this.query.getSingleData('users', res);
          })
        )
        .pipe(first())
        .subscribe((res2) => {
          let result = this.matchAdmin(res2);
          observer.next(result);
        }),
        (err) => observer.error(err),
        () => observer.complete();
    });
  }
}
