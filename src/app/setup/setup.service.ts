import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Region } from './models/region.model';
import { Platform } from './models/platform.model';
import { Day } from './models/days.model';
import { CommunicationPlatform } from './models/communication-platform.model';
import { SteamApp } from '../services/steam/models/steamApp.model';
import { Profile } from './models/profile.model';

/** Defines Injectable */
@Injectable({
  providedIn: 'root'
})
/**************************************************
 * @author Collin Larson
 * @version 1.0
 * @description Setup Service class handles the
 * API methods to get profile options
 *************************************************/
export class SetupService {

  /** Region collection */
  regionCollection: AngularFirestoreCollection<Region>;

  /** Platform collection */
  platformCollection: AngularFirestoreCollection<Platform>;

  /** Days collection */
  daysCollection: AngularFirestoreCollection<Day>;

  /** Comms collection */
  commsCollection: AngularFirestoreCollection<CommunicationPlatform>;

  /** Steam App collection */
  steamAppCollection: AngularFirestoreCollection<SteamApp>;

  /***********************************************************
   * @param afs Angular Fire Store
   * @param http Http Client
   * @description Creates an instance of setup service.
   **********************************************************/
  constructor(private afs: AngularFirestore, private http: HttpClient) { }

  /****************************************
   * Gets regions
   * @returns an observable of regions
   ***************************************/
  public getRegions() {
    this.regionCollection = this.afs.collection('regions', ref => {
      return ref.orderBy('name', 'desc');
    });
    return this.regionCollection.valueChanges();
  }

  /***************************************
   * Gets days
   * @returns an observable of days
   **************************************/
  public getDays() {
    this.daysCollection = this.afs.collection('days');
    return this.daysCollection.valueChanges();
  }

  /****************************************
   * Gets platforms
   * @returns an observable of platforms
   ***************************************/
  public getPlatforms() {
    this.platformCollection = this.afs.collection('platform');
    return this.platformCollection.valueChanges();
  }

  /***************************************
   * Gets comms
   * @returns an observable of comms
   **************************************/
  public getComms() {
    this.commsCollection = this.afs.collection('communicationPlatform');
    return this.commsCollection.valueChanges();
  }

  /******************************************
   * Gets fire steam game list
   * @returns an observable of steam games
   *****************************************/
  public getFireSteamGameList() {
    this.steamAppCollection = this.afs.collection('steamGames');
    return this.steamAppCollection.valueChanges();
  }

  /************************************************
   * Gets profile
   * @param uid user id
   * @returns an observable of a user profile
   ***********************************************/
  public getProfile(uid: string) {
    const profileRef = this.afs.doc(`profiles/${uid}`);
    return profileRef.get();
  }

  /************************************************
   * Saves profile
   * @param profile user profile to be saved
   * @returns an observable of a user profile
   ***********************************************/
  public saveProfile(profile: Profile) {
    // Sets user data to firestore on login
    const userRef: any= this.afs.doc(`profiles/${profile.uid}`);
    console.log(profile.days);
    return userRef.set({
      uid: profile.uid,
      displayName: profile.displayName,
      regionId: profile.regionId,
      platformId: profile.platformId,
      communicationPlatformId: profile.communicationPlatformId,
      days: profile.days,
      steamApps: profile.steamApps,
      bio: profile.bio,
      photoURL: profile.photoURL
    });
  }

}
