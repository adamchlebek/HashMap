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

  regionCollection   : AngularFirestoreCollection<Region>;
  platformCollection : AngularFirestoreCollection<Platform>;
  daysCollection     : AngularFirestoreCollection<Day>;
  commsCollection    : AngularFirestoreCollection<CommunicationPlatform>;
  
  constructor(private afs: AngularFirestore) { }

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
}