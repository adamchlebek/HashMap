import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  lng: any;
  lat: any;

  constructor() { }

  ngOnInit() {
    // this.getLocation();
  }

  // getLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position: Position) => {
  //       if (position) {
  //         console.log("Latitude: " + position.coords.latitude +
  //           "Longitude: " + position.coords.longitude);
  //         this.lat = position.coords.latitude;
  //         this.lng = position.coords.longitude;
  //         console.log(this.lat);
  //         console.log(this.lng);
  //         console.log(position);
  //       }
  //     },
  //       (error: PositionError) => console.log(error));
  //   } else {
  //     alert("Geolocation is not supported by this browser.");
  //   }
  // }
}
