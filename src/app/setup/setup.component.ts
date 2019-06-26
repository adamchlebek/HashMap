import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Region } from './models/region.model';
import { Observable } from 'rxjs';
import { SetupService } from './setup.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {
  steamID: string;
  invalid: boolean = true;
  regions: Observable<Region[]>;

  constructor(private _formBuilder: FormBuilder, private api: SetupService) {}

  ngOnInit() {
    this.steamID = "";
    this.invalid = true;
    this.regions = this.api.getRegions();
  }

  checkSteamID(){
    if (this.steamID.length != 17){
      this.invalid = true;
      console.log("Error!");
    }else{

      this.invalid = false;
    }
  }
}
