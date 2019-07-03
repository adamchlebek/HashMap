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

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  visible                      = true;
  selectable                   = true;
  removable                    = true;
  addOnBlur                    = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  gameCtrl                     = new FormControl();

  filteredGames: Observable<app[]>;
  
  games    : app[] = [{ appId: 1, name: "Escape From Tarkov"}];
  allGames : app[] = [{ appId: 2, name: "Overwatch"}, { appId: 3, name: "League Of Legends"},
                      { appId: 4, name: "PUBG"}];

  @ViewChild('gameInput', {static: false}) gameInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  steamID: string  = "";
  invalid: boolean = true;

  regions    : Observable<Region[]>;
  platforms  : Observable<Platform[]>;
  days       : Observable<Day[]>;
  comms      : Observable<CommunicationPlatform[]>;
  steamGames : any;

  constructor(private _formBuilder: FormBuilder, private api: SetupService, private steamApi: SteamApiService) 
  {
    this.filteredGames = this.gameCtrl.valueChanges.pipe(
      startWith(null),
      map((game: app | null) => game ? this._filter(game) : this.allGames.slice()));
  }

  ngOnInit() {
    // set when declared.
    // this.steamID = "";
    // this.invalid = true;
    this.getDropdowns();
    this.steamApi.getSteamGameList().subscribe((games: any) =>
    {
      this.steamGames = games;
      //console.log(games);

    });
  }

  checkSteamID(){
    if (this.steamID.length != 17){
      this.invalid = true;
      console.log("Error!");
    }else{
      this.invalid = false;
    }
  }

  getDropdowns() {
    this.regions   = this.api.getRegions();
    this.platforms = this.api.getPlatforms();
    this.days      = this.api.getDays();
    this.comms     = this.api.getComms();

  }

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        //this.games.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.gameCtrl.setValue(null);
    }
  }

  remove(game: app): void {
    const index = this.games.indexOf(game);

    if (index >= 0) {
      this.games.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    var id = event.option.viewValue;
    console.log(id);
    //this.games.push();
    this.gameInput.nativeElement.value = '';
    this.gameCtrl.setValue(null);
  }

  private _filter(game: app): app[] {
    const filterValue = game.appId;

    return this.allGames.filter(game => game.appId == filterValue);
  }

}
