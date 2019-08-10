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
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import { SteamApp } from '../services/steam/models/steamApp.model';
import { MatChipInputEvent } from '@angular/material/chips';
import { App } from './models/app.model';
import { startWith, map, timeout } from 'rxjs/operators';
import * as _ from 'lodash';
import { Profile } from './models/profile.model';
import { AuthService } from '../services/auth/auth.service';
import { NotificationService } from '../utility/notification/notification.service';

/** Setup Component Links */
@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
/**************************************************
 * @author Collin Larson
 * @version 1.0
 * @description Setup Component class handles the
 * front end logic of saving the user profile.
 *************************************************/
export class SetupComponent implements OnInit {

  /** Material Chip Variable */
  visible = true;

  /** Material Chip Variable */
  selectable = true;

  /** Material Chip Variable */
  removable = true;

  /** Material Chip Variable */
  addOnBlur = false;

  /** Material Chip Key codes */
  separatorKeysCodes: number[] = [ENTER, COMMA];

  /** New FormControl */
  appCtrl = new FormControl();

  /** observable of string array */
  filteredApps: Observable<string[]>;

  /** selected steam app array */
  selectedApps: any[] = [];

  /** all steam apps array */
  steamApps: SteamApp[];

  /** watching html input */
  @ViewChild('appInput', {static: false}) appInput: ElementRef<HTMLInputElement>;

  /** watching material input */
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  /** default steam ID */
  steamID = '';

  /** invalid boolean */
  invalid = true;

  /** observable of region array */
  regions: Observable<Region[]>;

  /** observable of platform array */
  platforms: Observable<Platform[]>;

  /** observable of day array */
  days: Observable<Day[]>;

  /** observable of comms array */
  comms: Observable<CommunicationPlatform[]>;

  /** preloading a default profile */
  profile: Profile = { uid: '', displayName: '', regionId: null, platformId: null,
    communicationPlatformId: null, bio: '', days: null, steamApps: null, _steamAppChips: null,
    friends: null, _friends: null, photoURL: null,
    _region: null, _communicationPlatform: null, _platform: null };

  /** uid represents a users id */
  private uid: string;

  /** url of profile photo */
  private photoURL: string;

  /***************************************************
   * Creates an instance of setup component.
   * @param api setup service api
   * @param auth suth service
   * @param notificationService ngx toaster service
   **************************************************/
  constructor(private api: SetupService, private auth: AuthService, private notificationService: NotificationService) {
    this.auth.user$.subscribe(u => {
      this.uid = u.uid;
      this.profile.uid = this.uid;
      this.photoURL = u.photoURL;
      this.getProfile();
    });
  }

  /****************************************
   * Component controller initialization
   ***************************************/
  ngOnInit() {
    this.getDropdowns();
  }

  /***************************
   * Gets users profile
   **************************/
  getProfile() {
    // prof is a DocumentData, typing as any to get past typescript mismatch issue
    this.api.getProfile(this.uid).subscribe((prof: any) => {
      if (prof.exists) {
        this.profile = prof.data();
        let sa       = this.steamApps;
        let ssa      = [];
        _.forEach(this.profile.steamApps, (key) => {
          ssa.push(_.find(sa, ['appid', key]));
        });
        this.selectedApps = ssa;
      } else {
        // doc.data() will be undefined in this case
      }
    });
  }

  /*******************************************
   * Gets regions, platforms, days, comms,
   * and app dropdowns
   *****************************************/
  getDropdowns() {
    this.api.getFireSteamGameList().subscribe((sapp) => {
      this.steamApps = sapp;
      this.filteredApps = this.appCtrl.valueChanges.pipe(
        startWith(null),
        map((steamApp: App | null) => steamApp ? this._filter(steamApp) : this.steamApps.slice()));
    });
    this.regions   = this.api.getRegions();
    this.platforms = this.api.getPlatforms();
    this.days      = this.api.getDays();
    this.comms     = this.api.getComms();
  }

  /******************************************
   * Saves user's profile & transfers page
   *****************************************/
  save() {
    this.profile.steamApps = _.map(this.selectedApps, 'appid');
    this.profile.photoURL = this.photoURL;
    this.api.saveProfile(this.profile).then((t) => {
      this.notificationService.showSuccessWithTimeout('Profile saved successfully.', 'Success.', 5000);
      window.location.href = '/profile?saved=true';
    });
  }

  /****************************************
   * Determines whether day selected is
   * @param id day id
   * @returns boolean day selected
   ***************************************/
  isDaySelected(id: number) {
    return _.includes(this.profile.days, id);
  }

  /***************************************
   * Days change event handler
   * @param event js event
   * @param d day obj
   **************************************/
  dayChange(event, d: Day) {
    if (event.target.checked) {
      if (this.profile.days == null) {
        this.profile.days = [];
      }
      this.profile.days.push(d.id);
    } else {
      // this.profile.days.slice(this.profile.days.indexOf(d.id),1);
      this.profile.days = _.remove(this.profile.days, (dayId) => {
        return (dayId !== d.id);
      });
    }
  }

  /****************************************
   * Add App event handler
   * @param event js event
   ***************************************/
  add(event: MatChipInputEvent): void {
    // Add app only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      // do nothing user cannot add games
    }
  }

  /************************************************
   * Removes steam app from selected list
   * @param game steam app obj
   ***********************************************/
  remove(game: App): void {
    const index = this.selectedApps.indexOf(game);

    if (index >= 0) {
      this.selectedApps.splice(index, 1);
    }
  }

  /*****************************************
   * Selected app event handler
   * @param event matieral event
   ****************************************/
  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedApps.push(event.option.value);
    this.appInput.nativeElement.value = '';
    this.appCtrl.setValue(null);
  }

  /**********************************************
   * Filters input text from app list
   * @param text inputted filter text
   * @returns filtered list of steam apps
   *********************************************/
  private _filter(text: any): any[] {
    const ga  = this.selectedApps;
    const list = _.filter(this.steamApps, (g: SteamApp) => {
      return _.findIndex(ga, {'appid': g.appid}) === -1;
    });

    const results = text ? list.filter(this.createFilterFor(text)) : list.filter(this.createFilterFor(''));
    return results;
  }

  /***********************************************
   * Creating list based on user input
   * @param query inputted filter text
   * @returns filtered list of steam apps
   **********************************************/
  public createFilterFor(query: string) {
    const lowerCaseQuery = query.toString().toLowerCase();

    return function filterFn(app: any) {
      return (app.name.toString().toLowerCase().indexOf(lowerCaseQuery) === 0);
    };
  }

  /*********************************
   * Create ms delay
   * @param ms milli second
   * @returns a timeout promise
   ********************************/
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
