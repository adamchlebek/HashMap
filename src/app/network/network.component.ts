import { Component, OnInit, ɵConsole, ViewChild } from '@angular/core';
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

/**************************************************
 * @author Adam Chlebek and Collin Larson
 * @version 1.0
 * @description Network component gets a list of profiles
 * based the users setup.
 *************************************************/
export class NetworkComponent implements OnInit {

  /** View Swiper child */
  @ViewChild('friendSwiper', { static: false }) friendSwiper: SwiperComponent;

  /** Uid of profile */
  private uid: string;

  /** User Profile */
  profile: Profile;

  /** Profiles of network component */
  profiles: Profile[];

  /** Steam apps of profile */
  steamApps: SteamApp[];

  /** Config  of swiper */
  config: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    keyboard: true,
    spaceBetween: 30
  };


  /******************************************************
   * Creates an instance of network component.
   * @param dialog material dialog component
   * @param api Network Service api
   * @param profileAPI Profile Service api
   * @param notificationService notification service api
   * @param auth auth api
   * @param setupAPI setup api
   * @param afs anguar firstore
   ****************************************************/
  constructor(
    public dialog: MatDialog,
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
        this.findFriends();
      } else {
        this.notificationService.showErrorWithTimeout('Profile not found.', 'Error', 5000);
      } // end of if profile exists
    });
  } // end of get profile

  /*******************************
   * Finds friends
   ******************************/
  findFriends() {
    this.api.getProfiles(this.profile).subscribe((profiles$: any) => {

      let profiles: Profile[] = [];
      profiles$.docs.forEach((profile: DocumentSnapshot<Profile>) => {
        if ((profile.id !== this.uid) && !_.find(this.profile.friends, {id: profile.id}) ) {
          profiles.push(profile.data());
        }
      });

      profiles.forEach((prof: Profile) => {
        let apps = [];
        this.profileAPI.getRegion(this.profile.regionId.toString()).subscribe((region: any) => {
          prof._region = region.data();
        });
        this.profileAPI.getComm(this.profile.communicationPlatformId.toString()).subscribe((comm: any) => {
          prof._communicationPlatform = comm.data();
        });
        this.profileAPI.getPlatform(this.profile.platformId.toString()).subscribe((platform: any) => {
          prof._platform = platform.data();
        });
        prof.steamApps.forEach((appId) => {
          this.profileAPI.getSteamApp(appId.toString()).subscribe((app: any) => {
            apps.push(app.data());
          });
        });
        prof._steamAppChips = apps;
      });
      this.profiles = profiles;
    });
  }

  /******************************************
   * Adds friend
   * @param prof profile to be added
   * @param index index of swiper
   *****************************************/
  addFriend(prof: Profile, index: number) {
    if (this.profile.friends == null) {
      this.profile.friends = [];
    }

    this.profile.friends.push(this.afs.doc(`profiles/${prof.uid}`).ref);

    this.setupAPI.saveProfile(this.profile).then((val: any) => {
      this.friendSwiper.swiper.removeSlide(index);
      this.notificationService.showSuccessWithTimeout('Friend added successfully.', 'Success.', 1000);
    });
  }

  /****************************************
   * Declines network component
   * @param prof profile to be removed
   * @param index index of profile
   **************************************/
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

}
