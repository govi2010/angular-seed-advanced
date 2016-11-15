import {FIREBASE, ENUMS, APPSETTINGS} from './app/frameworks/core/tokens';
import {AngularFire} from 'angularfire2';


export const TOKENS_WEB: Array<any> = [
  {
    provide: FIREBASE, useClass:AngularFire
  },
  { provide: ENUMS, useValue: {} },
  { provide: APPSETTINGS, useValue: {} }
];
