import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

/** Defines Injectable */
@Injectable({
  providedIn: 'root'
})
/**************************************************
 * @author Collin Larson
 * @version 1.0
 * @description Profile Service handles API calls
 * to firebase back end
 *************************************************/
export class ProfileService {

  /********************************************
   * Creates an instance of profile service.
   * @param afs AngularFireStore service
   *******************************************/
  constructor(private afs: AngularFirestore) { }

  /***************************************
   * Gets region
   * @param regionId the region id
   * @returns an observable of regions
   **************************************/
  public getRegion(regionId: string) {
    const regionRef = this.afs.doc(`regions/${regionId}`);
    return regionRef.get();
  }

  /*****************************************
   * Gets platform
   * @param platformId the platform id
   * @returns an observable of platforms
   ****************************************/
  public getPlatform(platformId: string) {
    const platormRef = this.afs.doc(`platform/${platformId}`);
    return platormRef.get();
  }

  /***************************************
   * Gets comm
   * @param commId the comm id
   * @returns an observable of comms
   **************************************/
  public getComm(commId: string) {
    const commRef = this.afs.doc(`communicationPlatform/${commId}`);
    return commRef.get();
  }

  /******************************************
   * Gets steam app
   * @param appId the app id
   * @returns an observable of steam apps
   *****************************************/
  public getSteamApp(appId: string) {
    const appRef = this.afs.doc(`steamGames/${appId}`);
    return appRef.get();
  }

}
