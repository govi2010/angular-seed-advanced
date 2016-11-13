import {Injectable, Inject, NgZone} from '@angular/core';
import {LogService} from '../../../app/frameworks/core/services/log.service';
import {Config} from '../../../app/frameworks/core/utils/config';
import {FIREBASE, LOADER} from '../../../app/frameworks/core/tokens';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/share';
import {UserModel} from '../../../app/frameworks/obek/models/user.model';
import {Router} from "@angular/router";


declare var zonedCallback: Function;


@Injectable()
export class FirebaseService {
  private _auth: any;
  private _database: any;


  constructor(private logger: LogService,
              private ngZone: NgZone,
              @Inject(FIREBASE) private firebase: any,
              @Inject(LOADER) private LoadingIndicator: any, private router: Router) {


    logger.debug(`FireBaseService Phone initializing...`);


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

  }

  public register(user: UserModel) {

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
    this._auth.logout();
  }

  public loginauthguard() {

    return this._auth
      .take(1)
      .map((authState: FirebaseAuthState) => !authState)
      .do(notAuthenticated => {
        if (!notAuthenticated) {
          console.log("loggedin");
          this.router.navigate(['/home'])
        }
        return null;
      });

  }


  public authguard() {


    return this._auth
      .take(1)
      .map((authState: FirebaseAuthState) => !!authState)
      .do(authenticated => {
        console.log("generatl :" + authenticated);
        if (!authenticated) {
          this.router.navigate(['/'])
        }
      });

  }
}

/**
 * Created by macbookpro on 13/11/16.
 */
