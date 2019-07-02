import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Region } from './models/region.model';
import { Platform } from './models/platform.model';
import { Day } from './models/days.model';
import { CommunicationPlatform } from './models/communication-platform.model';

@Injectable({
  providedIn: 'root'
})
export class SetupService {

  regionCollection   : AngularFirestoreCollection<Region>;
  platformCollection : AngularFirestoreCollection<Platform>;
  daysCollection     : AngularFirestoreCollection<Day>;
  commsCollection    : AngularFirestoreCollection<CommunicationPlatform>;

  constructor(private afs: AngularFirestore, private http: HttpClient) { }

  public getRegions() {
    this.regionCollection = this.afs.collection('regions');
    return this.regionCollection.valueChanges();
  }

  public getDays() {
    this.daysCollection = this.afs.collection('days');
    return this.daysCollection.valueChanges();
  }

  public getPlatforms() {
    this.platformCollection = this.afs.collection('platform');
    return this.platformCollection.valueChanges();
  }

  public getComms() {
    this.commsCollection = this.afs.collection('communicationPlatform');
    return this.commsCollection.valueChanges();
  }

  public getSteamGameList() {
    return this.http.get("https://hashmapwebapi20190701031620.azurewebsites.net/api/games");
  }

}
