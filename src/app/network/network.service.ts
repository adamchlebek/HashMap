import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Profile } from '../setup/models/profile.model';

@Injectable({
  providedIn: 'root'
})

/**************************************************
 * @author Adam Chlebek and Collin Larson
 * @version 1.0
 * @description Network service gets a list of profiles
 * based the users setup.
 *************************************************/
export class NetworkService {

  /*********************************************
   * Creates an instance of network service.
   * @param afs AngularFireStore
   *******************************************/
  constructor(private afs: AngularFirestore) { }

  /*************************************
   * Gets profiles
   * @param prof user profile
   * @returns list of similar profiles
   ************************************/
  public getProfiles(prof: Profile) {
    const profiles$ = this.afs.collection('profiles', ref => ref
      .where('regionId', '==', prof.regionId)
      .where('platformId', '==', prof.platformId)
      .where('communicationPlatformId', '==', prof.communicationPlatformId));
    return profiles$.get();
  }

}
