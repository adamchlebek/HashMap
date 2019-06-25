import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {
  steamID: string;
  invalid: boolean = true;

  constructor() {}

  ngOnInit() {
    this.steamID = "";
    this.invalid = true;
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
