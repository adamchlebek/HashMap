import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatModalService } from './chat-modal.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.scss']
})
export class ChatModalComponent implements OnInit {

  chat$: Observable<any>;
  newMsg: string;

  constructor(public cs: ChatModalService, private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
