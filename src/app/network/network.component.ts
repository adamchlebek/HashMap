import { Component, OnInit } from '@angular/core';
import { ProfileModalComponent } from '../profile-modal/profile-modal.component';
import { MatDialog } from '@angular/material';
import { NetworkService } from './network.service';
import { Profile } from '../setup/models/profile.model';
import { DocumentSnapshot } from '@angular/fire/firestore';
import { SwiperOptions } from 'swiper';
import { SteamApp } from '../services/steam/models/steamApp.model';
import { ProfileService } from '../profile/profile.service';
import * as _ from 'lodash';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface Food {
  value: string;
  viewValue: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})

export class NetworkComponent implements OnInit {

  profiles: Profile[];
  steamApps: SteamApp[];

  config: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30
  };

  constructor(public dialog: MatDialog, private api: NetworkService, private profileAPI: ProfileService) { }

  ngOnInit() {
    this.findFriends();
  }

  findFriends() {
    this.api.getProfiles().subscribe((profiles$: any) => {

      let profiles: Profile[] = [];

      profiles$.docs.forEach((profile: DocumentSnapshot<Profile>) => {
        profiles.push(profile.data());
      });

      profiles.forEach((prof: Profile) => {
        let apps = [];
        prof.steamApps.forEach((appId) => {
          this.profileAPI.getSteamApp(appId.toString()).subscribe((app : any) =>{
            apps.push(app.data());
          });
        });
        prof._steamAppChips = apps;
      });

      this.profiles  = profiles;
    });
  }

  isDaySelected(profile: Profile, id: number) {
    return _.includes(profile.days, id);
  } // end of isDaySelected

  openModal(row){
    const dialogRef = this.dialog.open(ProfileModalComponent, {
      width: '80%',
      data: {name: 'Adam', animal: 'Dog'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

    console.log(row);
  }

  accepted(row){
    console.log('Accepted');
  }

  declined(row){
    console.log('Declined');
  }

  displayedColumns: string[] = ['image', 'name', 'region', 'buttons'];
  dataSource = ELEMENT_DATA;

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

}
