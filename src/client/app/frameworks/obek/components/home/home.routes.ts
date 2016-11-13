import {Route} from '@angular/router';

import {HomeComponent} from './home.component';
import {AuthGuard} from './../../services/auth.guard'
export const HomeRoutes: Route[] = [
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]}
];
