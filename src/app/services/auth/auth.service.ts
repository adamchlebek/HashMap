import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';
import { User } from '../user.model';

/** Defines Injectable */
@Injectable({
  providedIn: 'root'
})
/************************************************
 * @author Collin larson
 * @version 1.0
 * @class AuthService
 * @description API service for managing users
 ***********************************************/
export class AuthService {
  /** User$  of auth service */
  user$: Observable<User>;

  /*****************************************************
   * @param afAuth Angular Fire Auth service
   * @param afs Angular Firestore API service
   * @param router Angular router service
   * @description Creates an instance of auth service.
   ****************************************************/
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  } // end of constructor

  /*****************************
   * Gets logged in user
   * @returns promise of user
   ****************************/
  getUser() {
    return (localStorage.getItem('user') === null) ? 
      this.user$.pipe(first()).toPromise() :
      JSON.parse(localStorage.getItem('user'));
  }

  /******************************
   * Google signin method
   * @returns a void promise
   *****************************/
  public async googleSignin() {
    const provider   = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  } // end of signin

  /********************************
   * Signs a user out
   * @returns route to about page
   *******************************/
  public async signOut() {
    await this.afAuth.auth.signOut();
    localStorage.clear();
    return this.router.navigate(['/about']);
  } // end of signout

  /**********************************
   * Updates user data
   * @param user the logged in user
   * @returns an obserable of user
   ********************************/
  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid         : user.uid,
      email       : user.email,
      displayName : user.displayName,
      photoURL    : user.photoURL
    };

    localStorage.setItem('user', JSON.stringify(data));

    return userRef.set(data, { merge: true });

  } // end of upDateUserData

} // end of auth service
