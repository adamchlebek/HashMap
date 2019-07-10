import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showSuccess(message, title) {
    this.toastr.success(message, title, {
      disableTimeOut:true
    });
  }

  showSuccessWithTimeout(message, title, timespan){
    this.toastr.success(message, title ,{
      //maxOpened     : 1,
      timeOut       :  timespan,
      positionClass : "toast-top-center",
      closeButton   : true,
    })
  }

  showHTMLMessage(message, title) {
    this.toastr.success(message, title, {
      enableHtml : true
    })
  }

}
