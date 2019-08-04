import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../utility/notification/notification.service';
import { SetupService } from '../setup/setup.service';
import { AuthService } from '../services/auth/auth.service';
import { Observable } from 'rxjs';
import { Day } from '../setup/models/days.model';
import { CommunicationPlatform } from '../setup/models/communication-platform.model';
import { Platform } from '../setup/models/platform.model';
import { Region } from '../setup/models/region.model';
import { Profile } from '../setup/models/profile.model';
import { SteamApp } from '../services/steam/models/steamApp.model';

import * as _ from 'lodash';
import { ProfileService } from './profile.service';

/** Setup Component Links */
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

/**************************************************
 * @author Collin Larson
 * @version 1.0
 * @description Profile Component class handles the
 * front end logic of loading the user profile.
 *************************************************/
export class ProfileComponent implements OnInit {
  /** FromSaved represents if a user is comming from the setup page after a save */
  fromSaved: any;

  /** uid represents a users id */
  private uid: string;

  /** an array of steam apps */
  steamApps: SteamApp[];

  /** observable of day array */
  days: Observable<Day[]>;

  /** A region */
  region: Region;

  /** A communication platform */
  comm: CommunicationPlatform;

  /** A platform */
  platform: Platform;

  /** preloading a default profile */
  profile: Profile = {uid: '', displayName: '', regionId: null, platformId: null, communicationPlatformId: null,
  bio: '', days: null, steamApps: null, _steamAppChips: null, friends: null, _friends: null};
  /** a boolean promise to check if data has come back from firebase */
  isLoaded: Promise<boolean>;

  /** Check if user has a saved profile */
  noProfile = false;



  /***********************************************************
   * @param route activated route
   * @param notificationService ngx toaster service
   * @param auth auth service
   * @param setupAPI setup api
   * @param api profile api
   * @description Creates an instance of profile component.
   *********************************************************/
  constructor(private route: ActivatedRoute, 
              private notificationService: NotificationService, 
              private auth: AuthService, 
              private setupAPI: SetupService,
              private api: ProfileService) { }

  /****************************************
   * Component controller initialization
   ***************************************/
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.fromSaved = params['saved'];
      if (this.fromSaved === 'true') {
        // If Save is successfull
        this.notificationService.showSuccessWithTimeout('Profile saved successfully.', 'Success.', 5000);
      }
    });
    this.auth.user$.subscribe(u => {
      this.uid  = u.uid;
      this.getProfile();
    });
  } // end of ngOnInit

  /******************************************
   * Gets profile from google firebase, and
   * fills out the ngModule respectively.
   *****************************************/
  getProfile() {
    // prof is a DocumentData, typing as any to get past typescript mismatch issue
    this.setupAPI.getProfile(this.uid).subscribe((prof: any) => {
      if (prof.exists) {
        this.profile = prof.data();
        let friends: Profile[] = [];
        let sa: SteamApp[] = [];
        this.profile.steamApps.forEach((appId) => {
          this.api.getSteamApp(appId.toString()).subscribe((app: any) => {
            sa.push(app.data());
          });
        });
        this.steamApps = sa;
        this.api.getRegion(this.profile.regionId.toString()).subscribe((region: any) => {
          this.region = region.data();
        });
        this.api.getComm(this.profile.communicationPlatformId.toString()).subscribe((comm: any) => {
          this.comm = comm.data();
        });
        this.api.getPlatform(this.profile.platformId.toString()).subscribe((platform: any) => {
          this.platform = platform.data();
        });
        _.forEach(this.profile.friends, function(profRef) {
          profRef.get().then((friendSnapShot: any) => {
            if(friendSnapShot.exists) {
              friends.push(friendSnapShot.data());
            }
          });
        });
        this.profile._friends = friends;
        this.isLoaded = Promise.resolve(true);
      } else {
        this.notificationService.showErrorWithTimeout('Profile not found.', 'Error', 5000);
        this.noProfile = true;
      } // end of if profile exists
    });
  } // end of get profile

  /**************************************
   * Determines whether day selected is
   * @param id => day id
   * @returns boolean
   *************************************/
  isDaySelected(id: number) {
    return _.includes(this.profile.days, id);
  } // end of isDaySelected

}
