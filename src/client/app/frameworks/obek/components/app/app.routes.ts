// app
import {LoginRoutes} from '../login/login.routes';
import {HomeRoutes} from '../home/home.routes';

export const routes: Array<any> = [
  ...LoginRoutes,
  ...HomeRoutes
];
