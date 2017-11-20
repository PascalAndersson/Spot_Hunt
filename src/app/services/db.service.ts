import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DbService {

  databaseRef: AngularFireList<Spot>;
  firebase: any;

  constructor(
    private afDb: AngularFireDatabase
  ) {
    this.databaseRef = afDb.list('spots');
    this.firebase = firebase;
   }

   public addSpot(spot: Spot) {
    this.databaseRef.push(spot);
  }

  public getAllSpots() {
    return this.afDb.list('spots').valueChanges();
  }
}

interface Spot {
  name: string,
  description: string,
  categories: {
    curbs: boolean,
    rails: boolean,
    stairs: boolean
  }
}





