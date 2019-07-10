import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NotificationService } from '../utility/notification/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  fromSaved: any;

  constructor(private route: ActivatedRoute, private notificationService: NotificationService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.fromSaved = params['saved'];
      console.log(this.fromSaved); // Print the parameter to the console.

      if (this.fromSaved == 'true'){
        //If Save is successfull
        this.notificationService.showSuccessWithTimeout("Profile saved successfully.","Success.",5000);
      }
  });
  }

}
