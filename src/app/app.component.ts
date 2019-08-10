import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Sets App Component Links
 */
@Component({
  selector    : 'app-root',
  templateUrl : './app.component.html',
  styleUrls   : ['./app.component.scss']
})

/** Sets Component Title */
export class AppComponent {

  /** Title  of app component */
  title = 'HashMap';
}
