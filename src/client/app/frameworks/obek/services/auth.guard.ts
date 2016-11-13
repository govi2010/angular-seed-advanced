/**
 * Created by macbookpro on 12/11/16.
 */
import {Injectable} from '@angular/core';
import {LogService} from '../../core/services/log.service';
import {CanActivate, Router} from '@angular/router';
import {FirebaseService} from "./firebase.service";


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private logger: LogService,private firebaseService: FirebaseService,private router: Router) {

  }


  canActivate(): any {
    return this.firebaseService.authguard();
  }
}
