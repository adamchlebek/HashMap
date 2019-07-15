import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Region } from './models/region.model';
import { Platform } from './models/platform.model';
import { Day } from './models/days.model';
import { CommunicationPlatform } from './models/communication-platform.model';
import { SteamApp } from '../services/steam/models/steamApp.model';
import { Profile } from './models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class SetupService {

  regionCollection   : AngularFirestoreCollection<Region>;
  platformCollection : AngularFirestoreCollection<Platform>;
  daysCollection     : AngularFirestoreCollection<Day>;
  commsCollection    : AngularFirestoreCollection<CommunicationPlatform>;
  steamAppCollection : AngularFirestoreCollection<SteamApp>;

  constructor(private afs: AngularFirestore, private http: HttpClient) { }

  public getRegions() {
    this.regionCollection = this.afs.collection('regions', ref => {
      return ref.orderBy('name', 'desc');
      //return ref.where('id', '==', 2);
    });
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

  public getFireSteamGameList() {
    this.steamAppCollection = this.afs.collection('steamGames');
    return this.steamAppCollection.valueChanges();
  }

  public getProfile(uid: string) {
    var profileRef = this.afs.doc(`profiles/${uid}`);
    return profileRef.get();
  }

  public saveProfile(profile : Profile) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<Profile> = this.afs.doc(`profiles/${profile.uid}`);

    return userRef.set(profile, {  mergeFields: ['bio','communicationPlatformId','days','displayName','platformId','regionId','steamApps','uid'] });
  }

}
