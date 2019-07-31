import { Component, OnInit }     from '@angular/core';
import { ActivatedRoute }        from "@angular/router";
import { NotificationService }   from '../utility/notification/notification.service';
import { SetupService }          from '../setup/setup.service';
import { AuthService }           from '../services/auth/auth.service';
import { Observable }            from 'rxjs';
import { Day }                   from '../setup/models/days.model';
import { CommunicationPlatform } from '../setup/models/communication-platform.model';
import { Platform }              from '../setup/models/platform.model';
import { Region }                from '../setup/models/region.model';
import { Profile }               from '../setup/models/profile.model';
import { SteamApp }              from '../services/steam/models/steamApp.model';

import * as _ from 'lodash';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  fromSaved   : any;
  private uid : string;
  steamApps   : SteamApp[];
  regions     : Observable<Region[]>;
  platforms   : Observable<Platform[]>;
  days        : Observable<Day[]>;
  comms       : Observable<CommunicationPlatform[]>;
  region      : Region;
  comm        : CommunicationPlatform;
  platform    : Platform;
  profile     : Profile = {uid:"", displayName: "", regionId: null, platformId: null, communicationPlatformId: null, bio: "", days:null, steamApps: null, _steamAppChips: null};
  isLoaded    : Promise<boolean>;
  noProfile   : boolean = false;


  constructor(private route: ActivatedRoute, 
              private notificationService: NotificationService, 
              private auth: AuthService, 
              private setupAPI: SetupService,
              private api: ProfileService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.fromSaved = params['saved'];
      //console.log(this.fromSaved); // Print the parameter to the console.

      if (this.fromSaved == 'true'){
        //If Save is successfull
        this.notificationService.showSuccessWithTimeout("Profile saved successfully.","Success.",5000);
      }
    });
    this.auth.user$.subscribe(u => {
      this.uid  = u.uid;
      this.getProfile();
      this.days = this.setupAPI.getDays();
    })
  } // end of ngOnInit

  getProfile() {
    // prof is a DocumentData, typing as any to get past typescript mismatch issue
    this.setupAPI.getProfile(this.uid).subscribe((prof : any) => {
      if(prof.exists) {
        this.profile = prof.data();
        let sa : SteamApp[] = [];
        this.profile.steamApps.forEach((appId) => {
          this.api.getSteamApp(appId.toString()).subscribe((app : any) =>{
            sa.push(app.data());
          });
        });
        this.steamApps = sa;
        this.api.getRegion(this.profile.regionId.toString()).subscribe((region:any) => {
          this.region = region.data();
        });
        this.api.getComm(this.profile.communicationPlatformId.toString()).subscribe((comm : any) => {
          this.comm = comm.data();
        });
        this.api.getPlatform(this.profile.platformId.toString()).subscribe((platform : any) => {
          this.platform = platform.data();
        });
        this.isLoaded = Promise.resolve(true);
      } else {
        this.notificationService.showErrorWithTimeout("Profile not found.","Error", 5000);
        this.noProfile = true;
      } // end of if profile exists
      
    });
  } // end of get profile

  isDaySelected(id : number) {
    return _.includes(this.profile.days, id);
  } // end of isDaySelected

}
