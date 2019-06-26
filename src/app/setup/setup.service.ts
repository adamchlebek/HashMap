import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Region } from './models/region.model';

@Injectable({
  providedIn: 'root'
})
export class SetupService {

  regionCollection: AngularFirestoreCollection<Region>;
  
  constructor(private afs: AngularFirestore) { }

  public getRegions() {
    this.regionCollection = this.afs.collection('regions');
    return this.regionCollection.valueChanges();
  }
}
