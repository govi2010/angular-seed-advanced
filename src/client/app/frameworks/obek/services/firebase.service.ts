import {Injectable, Inject, NgZone} from '@angular/core';
import {LogService} from '../../core/services/log.service';
import {Config} from '../../core/utils/config';
import {FIREBASE, LOADER} from '../../core/tokens';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/share';
import {UserModel} from '../models/user.model';
import {Router} from "@angular/router";

declare var zonedCallback: Function;

@Injectable()
export class FirebaseService {
  private _auth: any;
  private _database: any;


  constructor(private logger: LogService,
              private ngZone: NgZone,
              @Inject(FIREBASE) private firebase: any,
              @Inject(LOADER) private LoadingIndicator: any,private router: Router) {


    logger.debug(`FireBaseService initializing...`);
    debugger;
    if (Config.IS_MOBILE_NATIVE()) {
      firebase.init({
        persist: true,
        storageBucket: 'gs://obek-tech.appspot.com',
        iOSEmulatorFlush: true,
        onAuthStateChanged: (data: any) => {
          this.logger.debug(`Logged ${data.loggedIn ? 'into' : 'out of'} firebase.`);
        }
      }).then(() => {
        this.logger.debug('firebase.init done');
      }, (error: any) => {
        this.logger.debug('firebase.init error: ' + error);
      });

    } else {

      var config = {
        apiKey: "AIzaSyAgOpK4KRNQdd6rSI_bVqoTJZ4yORCPVZo",
        authDomain: "obek-tech.firebaseapp.com",
        databaseURL: "https://obek-tech.firebaseio.com",
        storageBucket: "obek-tech.appspot.com",
        messagingSenderId: "760379315885"
      };

      firebase.initializeApp(config);
      this._database = firebase.database();
      this._auth = firebase.auth();

      this.logger.debug("auth obj "+ (typeof this._auth))
    }
  }

  public login(user: UserModel) {
    if (Config.IS_MOBILE_NATIVE()) {
      return this.firebase.login({
        type: this.firebase.LoginType.PASSWORD,
        email: user.email,
        password: user.password
      }).then(
        function (result: any) {
          Config.token = result.uid
          Config.email = user.email
          return JSON.stringify(result);
        },
        function (errorMessage: any) {
          console.log(errorMessage);
        }
      )
    }
    else {
      return this._auth.signInWithEmailAndPassword(user.email, user.password).then(function (result: any) {
        return result;
      }, function (error: any) {
        return error;
      });
    }
  }

  public register(user: UserModel) {
    if (Config.IS_MOBILE_NATIVE()) {
      return this.firebase.createUser({
        email: user.email,
        password: user.password
      }).then(
        function (result: any) {
          return JSON.stringify(result);
        },
        function (errorMessage: any) {
          alert(errorMessage);
        }
      )
    }
    else {
      return this._auth.createUserWithEmailAndPassword(user.email, user.password).then(
        function (result: any) {
          console.log(result);
          //Config.token = result.uid
          return JSON.stringify(result);
        }, function (error: any) {
          alert(error.message);
        });
    }
  }

  public resetPassword(email: any) {
    //web
    return this._auth.sendPasswordResetEmail(email).then(function (result: any) {
      return JSON.stringify("You've requested to have your password reset. Please check your email to proceed.");
    }, function (error: any) {
      alert(error.message);
    });
  }

  public logout() {
    Config.token = "";
    this.firebase.logout();
  }

  public loginauthguard() {
    debugger;
    if (this._auth.currentUser) {

      this.router.navigate(['/home'])
      console.log("loggedin");

    }

    return true;

  }


  public authguard() {

    debugger;
    if (!this._auth.currentUser) {

      this.router.navigate(['/login'])
      console.log("loggedin");

    }

    return true;

  }
}

/**
 * Created by macbookpro on 13/11/16.
 */
