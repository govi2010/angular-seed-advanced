import {Injectable, Inject, NgZone} from '@angular/core';
import {LogService} from '../../core/services/log.service';
import {Config} from '../../core/utils/config';
import {FIREBASE, LOADER} from '../../core/tokens';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/share';
import {UserModel} from '../models/user.model';
import  {FirebaseService} from './firebase.service'
declare var zonedCallback: Function;

@Injectable()
export class UserService {
  private _auth: any;
  private _database: any;


  constructor(
    private logger: LogService,
    private firebaseService: FirebaseService,
    private ngZone: NgZone,
    @Inject(LOADER) private LoadingIndicator: any) {

    logger.debug(`UserService initializing...`);

  }

  public login(user: UserModel) {
    return this.firebaseService.login(user);
  }

  public register(user: UserModel){
   return this.firebaseService.register(user);
  }

  public resetPassword(email: any){
    //web
    return this.firebaseService.resetPassword(email);
  }

  public logout(){
    this.firebaseService.logout();
  }

}
