import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DbService {

  databaseRef: AngularFireList<any>;
  firebase: any;

  constructor(
    private afDb: AngularFireDatabase
  ) {
    this.databaseRef = afDb.list('spots');
    this.firebase = firebase;
   }

   public addSpot(spot: any) {
    this.databaseRef.push(spot);
  }

  public getAllSpots() {
    return this.afDb.list('spots').valueChanges();
  }

  public getSpotsIncludingKey(){
    return this.databaseRef.snapshotChanges().map( changes => {
      return changes.map( c => ({
        key: c.payload.key, ...c.payload.val()
      }));
    });
  }

  public getSpotByKey(key: string) {
    return this.afDb.object('spots/' + key).valueChanges();
  }
}






