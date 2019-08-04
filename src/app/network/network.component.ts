import { Component, OnInit, ɵConsole, ViewChild } from '@angular/core';
import { ProfileModalComponent } from '../profile-modal/profile-modal.component';
import { MatDialog } from '@angular/material';
import { NetworkService } from './network.service';
import { Profile } from '../setup/models/profile.model';
import { DocumentSnapshot, AngularFirestore } from '@angular/fire/firestore';
import { SwiperOptions } from 'swiper';
import { SteamApp } from '../services/steam/models/steamApp.model';
import { ProfileService } from '../profile/profile.service';
import * as _ from 'lodash';
import { SwiperComponent } from 'ngx-useful-swiper';
import { NotificationService } from '../utility/notification/notification.service';
import { AuthService } from '../services/auth/auth.service';
import { SetupService } from '../setup/setup.service';


/** Setup Component Links */
@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})

export class NetworkComponent implements OnInit {

  @ViewChild('friendSwiper', { static: false }) friendSwiper: SwiperComponent;

  private uid: string;

  profile: Profile;

  /** Profiles  of network component */
  profiles: Profile[];

  /** Steam apps of profile */
  steamApps: SteamApp[];

  /** Config  of swiper */
  config: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30
  };

  /*************************************************************
   * Creates an instance of network component.
   * @param dialog 
   * @param api 
   * @param profileAPI 
   ************************************************************/
  constructor(public dialog: MatDialog,
    private api: NetworkService,
    private profileAPI: ProfileService,
    private notificationService: NotificationService,
    private auth: AuthService,
    private setupAPI: SetupService,
    private afs: AngularFirestore) { }

  /** Network Component Initialization */
  ngOnInit() {
    this.auth.user$.subscribe(u => {
      this.uid  = u.uid;
      this.getProfile();
    });
    this.findFriends();
  }

  /******************************************
   * Gets profile from google firebase, and
   * fills out the ngModule respectively.
   *****************************************/
  getProfile() {
    // prof is a DocumentData, typing as any to get past typescript mismatch issue
    this.setupAPI.getProfile(this.uid).subscribe((prof: any) => {
      if (prof.exists) {
        this.profile = prof.data();
        // let sa: SteamApp[] = [];
        // this.profile.steamApps.forEach((appId) => {
        //   this.api.getSteamApp(appId.toString()).subscribe((app: any) => {
        //     sa.push(app.data());
        //   });
        // });
        // this.steamApps = sa;
        // this.api.getRegion(this.profile.regionId.toString()).subscribe((region: any) => {
        //   this.region = region.data();
        // });
        // this.api.getComm(this.profile.communicationPlatformId.toString()).subscribe((comm: any) => {
        //   this.comm = comm.data();
        // });
        // this.api.getPlatform(this.profile.platformId.toString()).subscribe((platform: any) => {
        //   this.platform = platform.data();
        // });
      } else {
        this.notificationService.showErrorWithTimeout('Profile not found.', 'Error', 5000);
      } // end of if profile exists
    });
  } // end of get profile

  /*******************************
   * Finds friends
   ******************************/
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
      this.profiles = profiles;
    });
  }


  addFriend(prof: Profile, index: number) {
    this.profile.friends.push(this.afs.doc(`profiles/${prof.uid}`).ref);
    this.setupAPI.saveProfile(this.profile).then((val:any) => {
      this.friendSwiper.swiper.removeSlide(index);
      this.notificationService.showSuccessWithTimeout('Friend added successfully.', 'Success.', 5000);
    });
  }

  decline(prof: Profile, index: number) {
    this.friendSwiper.swiper.removeSlide(index);
  }

  /**************************************
   * Determines whether day selected is
   * @param id => day id
   * @returns boolean
   *************************************/
  isDaySelected(profile: Profile, id: number) {
    return _.includes(profile.days, id);
  } // end of isDaySelected

  // openModal(row){
  //   const dialogRef = this.dialog.open(ProfileModalComponent, {
  //     width: '80%',
  //     data: {name: 'Adam', animal: 'Dog'}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   });

  //   console.log(row);
  // }

}
