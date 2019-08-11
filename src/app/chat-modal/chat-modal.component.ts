import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatModalService } from './chat-modal.service';
import { ActivatedRoute } from '@angular/router';
import { SetupService } from '../setup/setup.service';
import { AuthService } from '../services/auth/auth.service';
import { Profile } from '../setup/models/profile.model';
import { NotificationService } from '../utility/notification/notification.service';
import * as _ from 'lodash';
import { User } from '../services/user.model';


@Component({
  selector: 'app-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.scss']
})
export class ChatModalComponent implements OnInit {

  chat$: Observable<any>;
  newMsg: string;
  user: User;
  profile: Profile;
  chatId: string;
  isLoading = true;

  constructor(
    public cs: ChatModalService,
    private route: ActivatedRoute,
    private setupAPI: SetupService,
    private auth: AuthService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.getProfile();
  }

  async getProfile() {
    this.user = await this.auth.getUser();
    // prof is a DocumentData, typing as any to get past typescript mismatch issue
    this.setupAPI.getProfile(this.user.uid).subscribe((prof: any) => {
      if (prof.exists) {
        this.profile = prof.data();
        this.getFriends().then(friends => {
          this.profile._friends = friends;
        });

        if (this.user.uid.localeCompare(this.profile.friends[0].id) == 1) {
          this.chatId = this.user.uid+this.profile.friends[0].id;
        } else {
          this.chatId = this.profile.friends[0].id+this.user.uid;
        }
        this.onInitChat();
        this.isLoading = false;
      } else {
        this.notificationService.showErrorWithTimeout('Profile not found.', 'Error', 5000);
      } // end of if profile exists
    });
  } // end of get profile

  async getFriends() {
    let friends: Profile[] = [];
    await _.forEach(this.profile.friends, (profRef) => {
      profRef.get().then((friendSnapShot: any) => {
        if (friendSnapShot.exists) {
          friends.push(friendSnapShot.data());
        }
      });
    });
    return friends;
  }

  onInitChat() {
    this.cs.get2(this.chatId).subscribe((chat: any) => {
      if(chat.exists) {
        this.chat$ = this.cs.joinUsers(this.cs.get(this.chatId));
      } else {
        this.cs.create(this.chatId);
      }
    })
    // const source = this.cs.get(this.chatId);
    // const source2 = this.cs.get(this.chatId);
    // source.subscribe((src: any) => {
    //   if(!src.exists) {
    //     this.cs.create(this.chatId);
    //   }
    // });
    //console.log(source);
    //this.chat$ = this.cs.joinUsers(source);
    //console.log(this.chat$);
  }

  changeChat(id: string) {
    if (this.user.uid.localeCompare(id) == 1) {
      this.chatId = this.user.uid+id;
    } else {
      this.chatId = id+this.user.uid;
    }
    this.onInitChat();
  }

  submit(chatId) {
    if(!this.newMsg) {
      return alert('You need to enter something');
    }
    this.cs.sendMessage(this.chatId, this.newMsg);
    this.newMsg = '';
  }

  trackByCreated(i, msg) {
    return msg.createdAt;
  }

  getChatId(id: string) {
    let chatId = '';
    if (this.user.uid.localeCompare(id) == 1) {
      chatId = this.user.uid+id;
    } else {
      chatId = id+this.user.uid;
    }
    return chatId;
  }

}
