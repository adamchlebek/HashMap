import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Profile } from '../setup/models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private afs: AngularFirestore) { }

  public getProfiles(prof: Profile) {
    var profiles$ = this.afs.collection('profiles', ref => ref
      .where('regionId', '==', prof.regionId)
      .where('platformId', '==', prof.platformId)
      .where('communicationPlatformId', '==', prof.communicationPlatformId));
    return profiles$.get();
  }

}
