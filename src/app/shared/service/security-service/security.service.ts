import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {first, switchMap} from 'rxjs/operators';
import {QueryServiceService} from '../query-service.service';
import {UserInformation} from '../../../config/interfaces/user.interface';
import {Roles} from '../../../config/enum/default.enum';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private query: QueryServiceService) { }

  checkAuthorization(user: UserInformation, isRoleValid: string): boolean {
    if (!user) return false;
    // for (const role of user.role) {
      if (user.metaData.role == isRoleValid) {
        return true;
      }
    // }
    return false;
  }

  matchAdmin(user: UserInformation): boolean {
    return this.checkAuthorization(user, Roles.Admin);
  }
  matchStudent(user: UserInformation): boolean {
    return this.checkAuthorization(user, Roles.Customer);
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
  isStudent(): Observable<boolean> {
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
          let result = this.matchStudent(res2);
          observer.next(result);
        }),
        (err) => observer.error(err),
        () => observer.complete();
    });
  }

  isRegisteredInContest(contestID: string): Observable<boolean> {
    let studentId;
    return new Observable((observer) => {
      this.query
        .getLoggedInUserID()
        .pipe(
          switchMap((res) => {
            studentId = res;
            return this.query.getSingleData('contests', contestID);
          })
        )
        .pipe(first())
        .subscribe((res2) => {
          console.log(res2);
          let students = res2.attended;
          let ok = false;
          for(let i =0;i<students.length;++i){
            if(students[i] == studentId){
                ok = true;
            }
          }
          console.log("   contest   ttttttttttttt  studentId  "+studentId);
          observer.next(ok);
        }),
        (err) => observer.error(err),
        () => observer.complete();
    });
  }
}
