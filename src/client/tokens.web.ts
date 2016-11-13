import {FIREBASE, ENUMS, APPSETTINGS} from './app/frameworks/core/tokens';
import { AngularFireModule } from 'angularfire2';


export const TOKENS_WEB: Array<any> = [
  {
    provide: FIREBASE, useFactory: () => {
      return AngularFireModule;
    }
  },
  { provide: ENUMS, useValue: {} },
  { provide: APPSETTINGS, useValue: {} }
];
