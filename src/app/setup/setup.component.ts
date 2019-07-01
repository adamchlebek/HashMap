import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Region } from './models/region.model';
import { Observable } from 'rxjs';
import { SetupService } from './setup.service';
import { Platform } from './models/platform.model';
import { CommunicationPlatform } from './models/communication-platform.model';
import { Day } from './models/days.model';
import { SteamApiService } from '../services/steam/steam-api.service';
import { SteamApp } from '../services/steam/models/steamApp.model';
import { SteamAppList } from '../services/steam/models/steam-app-list.model';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  steamID: string  = "";
  invalid: boolean = true;

  regions    : Observable<Region[]>;
  platforms  : Observable<Platform[]>;
  days       : Observable<Day[]>;
  comms      : Observable<CommunicationPlatform[]>;
  steamGames : any;

  constructor(private _formBuilder: FormBuilder, private api: SetupService, private steamApi: SteamApiService) {}

  ngOnInit() {
    // set when declared.
    // this.steamID = "";
    // this.invalid = true;
    this.getDropdowns();
    this.steamApi.getSteamGameList().subscribe((games: any) =>
    {
      //this.steamGames = games.applist.apps;
      console.log(games);

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
}
