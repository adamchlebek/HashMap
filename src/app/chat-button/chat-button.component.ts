import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ChatModalComponent } from '../chat-modal/chat-modal.component';

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
  constructor(public dialog: MatDialog) { }

  /** Defines ngOnInit */
  ngOnInit() {
  }

  openModal() {
    const dialogRef = this.dialog.open(ChatModalComponent, {
      width: '1000px',
      height: '700px'
    });
  }

}
