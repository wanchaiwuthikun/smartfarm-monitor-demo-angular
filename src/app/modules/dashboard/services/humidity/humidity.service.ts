import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Humidity} from '@modules/dashboard/models/humidity';
import {SensorsStatus} from '@modules/dashboard/models/sensorsStatus';

@Injectable({
  providedIn: 'root'
})

export class HumidityService {

  private dbPath = '/logDHT';
  private wifiSensors = '/wifiSensors';
  private humiditySensors = '/humiditySensors';

  constructor(private db: AngularFireDatabase) { }

  getList(): Observable<Humidity[]> {
    return this.db.list(this.dbPath).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
         Object.assign({key:  c.payload.key }, c.payload.val() ) as Humidity
        )
      )
    );
  }

  getListWithPeriod(startDate: string, endDate: string): Observable<Humidity[]> {
    return this.db.list(this.dbPath, ref => ref.orderByChild('date').startAt(startDate).endAt(endDate)).snapshotChanges().pipe(
      map(changes =>
        changes.map(change =>
          Object.assign({key:  change.payload.key }, change.payload.val() ) as Humidity
        )
      )
    );
  }

  getLastRecord(): Observable<Humidity[]> {
    return this.db.list(this.dbPath, ref => ref.limitToLast(1)).snapshotChanges().pipe(
      map(changes =>
        changes.map(change =>
          Object.assign({key:  change.payload.key }, change.payload.val() ) as Humidity
        )
      )
    );
  }

  getFirstRecord(): Observable<Humidity[]> {
    return this.db.list(this.dbPath, ref => ref.limitToFirst(1)).snapshotChanges().pipe(
      map(changes =>
        changes.map(change =>
          Object.assign({key:  change.payload.key }, change.payload.val() ) as Humidity
        )
      )
    );
  }
  getWifiStatus(): Observable<any[]> {
    return this.db.list(this.wifiSensors, ref => ref.limitToFirst(1)).valueChanges();
  }

  getHumidityStatus(): Observable<any> {
    return this.db.list(this.humiditySensors, ref => ref.limitToLast(1)).valueChanges();
  }
}
