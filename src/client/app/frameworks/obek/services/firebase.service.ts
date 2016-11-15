import {Injectable, Inject, NgZone, Injector} from '@angular/core';
import {LogService} from '../../core/services/log.service';
import {Config} from '../../core/utils/config';
import {FIREBASE, LOADER} from '../../core/tokens';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/share';
import {UserModel} from '../models/user.model';
import {Router} from "@angular/router";


declare var zonedCallback: Function;

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class FirebaseService {
  private _auth: any;
  private _database: any;


  constructor(private injector: Injector,
              private logger: LogService,
              private ngZone: NgZone,
              @Inject(FIREBASE) private firebase: any,
              @Inject(LOADER) private LoadingIndicator: any, private router: Router) {


    logger.debug(`FireBaseService initializing...`);

    if (Config.IS_MOBILE_NATIVE()) {
      firebase.init({
        persist: true,
        storageBucket: 'gs://obek-tech.appspot.com',
        onAuthStateChanged: (data: any) => {
          this.logger.debug(`Logged ${data.loggedIn ? 'into' : 'out of'} firebase.`);
          if(data.loggedIn)
          {
            this.router.navigate(['/home'])
          }else{
            this.router.navigate(['/'])
          }

        }
      }).then(() => {
        this.logger.debug('firebase.init done');
      }, (error: any) => {
        this.logger.debug('firebase.init error: ' + error);
      });
    } else {

      // debugger;
      // firebase =  injector.get(firebase);
      // debugger;
      this._database = firebase.database;
      this._auth = firebase.auth;

      this.logger.debug("auth obj " + (typeof this._auth))
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
      return this._auth.login(
        {email: user.email, password: user.password}, {
          provider: 4,
          method: 3
        }).then(function (result: any) {
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
      return this._auth.createUser({email: user.email, password: user.password}).then(
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
    if (Config.IS_MOBILE_NATIVE()) {
      this.firebase.logout();
    }else{
      this._auth.logout();
    }

  }

  public loginauthguard() {

    if (Config.IS_MOBILE_NATIVE()) {
      //console.log(this.firebase);
      return true;
    } else {
      return this._auth
        .take(1)
        .map((authState: any) => !authState)
        .do(notAuthenticated => {
          if (!notAuthenticated) {
            console.log("loggedin");
            this.router.navigate(['/home'])
          }
          return null;
        });
    }

  }


  public authguard() {

    if (Config.IS_MOBILE_NATIVE()) {
      //console.log(this.firebase);
      return true;

    }
    else {
      return this._auth
        .take(1)
        .map((authState: any) => !!authState)
        .do(authenticated => {
          console.log("generatl :" + authenticated);
          if (!authenticated) {
            this.router.navigate(['/'])
          }
        });
    }


  }
}

/**
 * Created by macbookpro on 13/11/16.
 */
