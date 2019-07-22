import { Component, OnInit } from '@angular/core';

/** Setup Component Links */
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

/**************************************************
 * @author Adam Chlebek
 * @version 1.0
 * @description About Component is all front-ended
 * information about the project
 *************************************************/
export class AboutComponent implements OnInit {
  /**
   * Creates an instance of about component.
   */
  constructor() { }


  /**
   * About Component initialization
   */
  ngOnInit() {
  }
}
