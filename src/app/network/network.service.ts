import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private afs: AngularFirestore) { }

  public getProfiles() {
    var profiles$ = this.afs.collection('profiles', ref => ref.where('regionId', '==', '1'));
    return profiles$.get();
  }

}
