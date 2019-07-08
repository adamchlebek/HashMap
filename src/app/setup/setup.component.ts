import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Region } from './models/region.model';
import { Observable } from 'rxjs';
import { SetupService } from './setup.service';
import { Platform } from './models/platform.model';
import { CommunicationPlatform } from './models/communication-platform.model';
import { Day } from './models/days.model';
import { SteamApiService } from '../services/steam/steam-api.service';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import { SteamApp } from '../services/steam/models/steamApp.model';
import { SteamAppList } from '../services/steam/models/steam-app-list.model';
import { MatChipInputEvent } from '@angular/material/chips';
import { app } from './models/app.model';
import { startWith, map } from 'rxjs/operators';
import * as _ from "lodash";
import { Profile } from './models/profile.model';
import { AuthService } from '../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  visible                      = true;
  selectable                   = true;
  removable                    = true;
  addOnBlur                    = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  appCtrl                      = new FormControl();

  filteredApps: Observable<string[]>;

  selectedApps : any[] = [];
  steamApps    : SteamApp[];

  @ViewChild('appInput', {static: false}) appInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  steamID: string  = "";
  invalid: boolean = true;

  regions    : Observable<Region[]>;
  platforms  : Observable<Platform[]>;
  days       : Observable<Day[]>;
  comms      : Observable<CommunicationPlatform[]>;
  profile    : Profile = {uid:"", displayName: "", regionId: null, platformId: null, communicationPlatformId: null, bio: "", steamApps: null};

  private uid : string;

  constructor(private api: SetupService, private auth: AuthService, private toastr: ToastrService) {
    this.auth.user$.subscribe(u => {
      this.uid         = u.uid;
      this.profile.uid = this.uid;
      this.getProfile();
    })
  }

  ngOnInit() {
    this.getDropdowns();
  }

  checkSteamID(){
    if (this.steamID.length != 17){
      this.invalid = true;
      console.log("Error!");
    }else{
      this.invalid = false;
    }
  }

  getProfile() {
    // prof is a DocumentData, typing as any to get past typescript mismatch issue
    this.api.getProfile(this.uid).subscribe((prof : any) => {
      if(prof.exists) {
        this.profile = prof.data();
        let sa       = this.steamApps;
        let ssa      = [];
        _.forEach(this.profile.steamApps, function(key)
        {
          ssa.push(_.find(sa, ['appid', key]));
        });
        this.selectedApps = ssa;
      } else {
          // doc.data() will be undefined in this case
        };
      });
  }

  getDropdowns() {
    this.api.getFireSteamGameList().subscribe((sapp) => {
      this.steamApps = sapp;
      this.filteredApps = this.appCtrl.valueChanges.pipe(
        startWith(null),
        map((steamApp: app | null) => steamApp ? this._filter(steamApp) : this.steamApps.slice()));
    });
    this.regions   = this.api.getRegions();
    this.platforms = this.api.getPlatforms();
    this.days      = this.api.getDays();
    this.comms     = this.api.getComms();
  }

  save() {
    this.profile.steamApps = _.map(this.selectedApps, 'appid');
    this.api.saveProfile(this.profile);

    //If Save is successfull
    this.showToaster();

    //If Save is error
    //this.showToasterError();
  }

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      // do nothing user cannot add games
    }
  }

  remove(game: app): void {
    const index = this.selectedApps.indexOf(game);

    if (index >= 0) {
      this.selectedApps.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedApps.push(event.option.value);
    this.appInput.nativeElement.value = '';
    this.appCtrl.setValue(null);
  }

  private _filter(text: any): any[] {
    let ga  = this.selectedApps;
    var list = _.filter(this.steamApps, (g:SteamApp) =>
    {
      return _.findIndex(ga, <any>{'appid':g.appid}) === -1;
    });

    var results = text ? list.filter(this.createFilterFor(text)) : list.filter(this.createFilterFor(''));
    return results;
  }

  public createFilterFor(query:string) {
    var lowerCaseQuery = query.toString().toLowerCase();

    return function filterFn(app) {
      return (app.name.toString().toLowerCase().indexOf(lowerCaseQuery) === 0)
    }
  }

  showToaster(){
    this.toastr.success("Your profile has successfully been saved!", "Success!" ,{
      timeOut :  5000
    })
  }

  showToasterError(){
    this.toastr.error("There was an error saving your profile.", "Error!" ,{
      timeOut :  5000
    })
  }

}
