import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

/** Setup Component Links */
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

/**************************************************
 * @author Adam Chlebek and Colin Larson
 * @version 1.0
 * @description Creates Navigation Bar for all
 * components on the page.
 *************************************************/
export class NavComponent implements OnInit {
  /***********************************************************
   * @param auth authService
   * @description Creates an instance of nav component.
   *********************************************************/
   constructor(public auth: AuthService) { }

  /**
   * Nav Component Initialization
   */
  ngOnInit() {
  }

}
