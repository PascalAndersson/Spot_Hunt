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

  // Get all props but the object key
  public getAllSpots() {
    return this.databaseRef.valueChanges();
  }
  public getSpotKey() {
    return this.databaseRef.snapshotChanges();
  }
  public getSpotByKey(key: string) {
    return this.afDb.object('spots/' + key).valueChanges();
  }
}