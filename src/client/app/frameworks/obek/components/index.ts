import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {SidebarComponent} from "./sidebar/sidebar.component";
import {SettingsComponent} from "./settings/settings.component";
import {MainComponent} from "./main-content/main.component";



// for routes
export const ENTRY_COMPONENTS: any[] = [
  LoginComponent,
  HomeComponent,
  SidebarComponent,
  MainComponent,
  SettingsComponent
];

export * from './app/app.component';
export * from './login/login.component';
export * from './home/home.component';
export * from './sidebar/sidebar.component';
export * from './main-content/main.component';
export * from './settings/settings.component'
