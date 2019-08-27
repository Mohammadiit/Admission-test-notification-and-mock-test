import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {first} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class QueryServiceService {

  constructor(public af: AngularFirestore) { }
  getSingleData(collectionName: string, documentId:string): Observable<any> {
    return new Observable((observer) => {
      this.af.collection(collectionName).doc(documentId).get().pipe(first()).subscribe(
        (res) => {
          observer.next(res.data()?res.data():null);
        },
        (err) => observer.error(err),
        () => observer.complete()
      );
    });
}
