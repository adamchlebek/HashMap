import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
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

  readonly api = 'http://api.steampowered.com';

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
    //let headers = new HttpHeaders().set('Authorization', 'auth-token');
    let params  = new HttpParams().set('key', 'FF9EF8B9781E5ECEB5EF98640452607A');
    params = params.append('format','json');

    let url : string = `${this.api}/ISteamApps/GetAppList/v0002/`;

    //return this.http.get(url, { headers, params } ); 
    return this.http.get(url, { params });
  }
  
}
