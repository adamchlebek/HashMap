import { Component, OnInit, Input } from '@angular/core';
import { Profile } from '../setup/models/profile.model';

/** Setup Component Links */
@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.scss']
})

/**************************************************
 * @author Adam Chlebek and Collin Larson
 * @version 1.0
 * @description FriendCardComponent class handles the
 * front end logic of showing your friend list.
 *************************************************/
export class FriendCardComponent implements OnInit {

  /** Input of friends for component */
  @Input() friends: Profile[];

  /** Creates an instance of friend card component. */
  constructor() { }

  /** Defines ngOnInit */
  ngOnInit() {
  }

}
