import { Component, OnInit } from '@angular/core';

/** Setup Component Links */
@Component({
  selector: 'app-chat-button',
  templateUrl: './chat-button.component.html',
  styleUrls: ['./chat-button.component.scss']
})

/**************************************************
 * @author Adam Chlebek and Collin Larson
 * @version 1.0
 * @description ChatButtonComponent class handles the
 * front end logic of openeing the chat model
 *************************************************/
export class ChatButtonComponent implements OnInit {

  /** Creates an instance of chat button component. */
  constructor() { }

  /** Defines ngOnInit */
  ngOnInit() {
  }

}
