import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ChatModalComponent } from '../chat-modal/chat-modal.component';

@Component({
  selector: 'app-chat-button',
  templateUrl: './chat-button.component.html',
  styleUrls: ['./chat-button.component.scss']
})
export class ChatButtonComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openModal() {
    const dialogRef = this.dialog.open(ChatModalComponent, {
      width: '600px',
      height: '700px'
    });
  }

}
