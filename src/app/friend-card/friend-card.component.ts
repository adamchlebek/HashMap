import { Component, OnInit, Input } from '@angular/core';
import { Profile } from '../setup/models/profile.model';

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.scss']
})
export class FriendCardComponent implements OnInit {
  @Input() friends: Profile[];
  constructor() { }

  ngOnInit() {
  }

}
