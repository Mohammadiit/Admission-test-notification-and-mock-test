import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {first} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class QueryServiceService {

  constructor(public af: AngularFirestore, private afAuth: AngularFireAuth) {
  }

  getLoggedInUserID(): Observable<any> {
    return new Observable((observer) => {
      this.afAuth.authState.pipe(first()).subscribe(
        (res) => {
          observer.next(res && res.uid ? res.uid : null);
        },
        (err) => observer.error(err),
        () => observer.complete()
      );
    });
  }


  getSingleData(collectionName: string, documentId: string): Observable<any> {
    return new Observable((observer) => {
      this.af.collection(collectionName).doc(documentId).get().pipe(first()).subscribe(
        (res) => {
          observer.next(res.data() ? res.data() : null);
        },
        (err) => observer.error(err),
        () => observer.complete()
      );
    });
  }
}
