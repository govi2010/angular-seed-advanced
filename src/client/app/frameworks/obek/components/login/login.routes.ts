import { Route } from '@angular/router';

import { LoginComponent } from './login.component';
import  {LoginAuthGuard} from '../../services/login.auth.gaurd';

export const LoginRoutes: Route[] = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [LoginAuthGuard]
  },
];
