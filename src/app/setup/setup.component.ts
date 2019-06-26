import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Region } from './models/region.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  isLinear = false;
  firstFormGroup  : FormGroup;
  secondFormGroup : FormGroup;

  regionCollection: AngularFirestoreCollection<Region>;
  regions: Observable<Region[]>;

  constructor(private _formBuilder: FormBuilder, private afs: AngularFirestore) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.regionCollection = this.afs.collection('regions');
    this.regions          = this.regionCollection.valueChanges();

  }


}
