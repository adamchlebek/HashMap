import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

/** Defines Injectable */
@Injectable({
  providedIn: 'root'
})

/**********************************************
 * @class NotificationService
 * @author Collin Larson
 * @version 1.0
 * @description NGX Toaster service to manage
 * * notifcations
 *********************************************/
export class NotificationService {

  /***********************************************
   * Creates an instance of notification service.
   * @param toastr toaster service
   ***********************************************/
  constructor(private toastr: ToastrService) { }

  /************************************
   * Shows success toastr
   * @param message displayed message
   * @param title displayed title
   ***********************************/
  showSuccess(message, title) {
    this.toastr.success(message, title, {
      disableTimeOut: true
    });
  }

  /**************************************
   * Shows success with timeout
   * @param message displayed message
   * @param title displayed title
   * @param timespan time in ms
   ************************************/
  showSuccessWithTimeout(message, title, timespan) {
    this.toastr.success(message, title , {
      timeOut       :  timespan,
      positionClass : 'toast-top-center',
      closeButton   : true,
    });
  }

  /**************************************
   * Shows error with timeout
   * @param message displayed message
   * @param title displayed title
   * @param timespan time in ms
   ************************************/
  showErrorWithTimeout(message, title, timespan) {
    this.toastr.error(message, title, {
      timeOut       :  timespan,
      positionClass : 'toast-top-center',
      closeButton   : true,
    });
  }

  /*************************************
   * Shows htmlmessage
   * @param message displayed message
   * @param title  displayed title
   ***********************************/
  showHTMLMessage(message, title) {
    this.toastr.success(message, title, {
      enableHtml : true
    });
  }

}
