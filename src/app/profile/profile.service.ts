import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private afs: AngularFirestore) { }

  public getRegion(regionId: string) {
    const regionRef = this.afs.doc(`regions/${regionId}`);
    return regionRef.get();
  }

  public getPlatform(platformId: string) {
    const platormRef = this.afs.doc(`platform/${platformId}`);
    return platormRef.get();
  }

  public getComm(commId: string) {
    const commRef = this.afs.doc(`communicationPlatform/${commId}`);
    return commRef.get();
  }

  public getSteamApp(appId: string) {
    const appRef = this.afs.doc(`steamGames/${appId}`);
    return appRef.get();
  }

}
