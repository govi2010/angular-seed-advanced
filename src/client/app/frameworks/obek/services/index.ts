import {UserService} from './user.service';
import {AuthGuard} from './auth.guard';
import { LoginAuthGuard }from './login.auth.gaurd';
import {FirebaseService} from "./firebase.service";

export const OBEK_PROVIDERS: Array<any> = [
  UserService,
  AuthGuard,
  LoginAuthGuard,
  FirebaseService
];

export * from './firebase.service'
export * from './user.service';

export  * from  './auth.guard';
export  * from './login.auth.gaurd';


