import {
  Inject,
  trigger,
  style,
  animate,
  state,
  transition,
  keyframes,
  ViewChild,
  ElementRef,
  OnInit
} from '@angular/core';
import {BaseComponent} from '../../../core/decorators/base.component';
import {LogService} from '../../../core/services/log.service';
import {FRAME, DIALOGS} from '../../../core/tokens';
import {Observable} from 'rxjs/Observable';
import {Config} from '../../../core/utils/config';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@BaseComponent({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.css']
})
export class HomeComponent implements OnInit {


  constructor(public userService: UserService,
              private logger: LogService,
              private _router: Router,
              @Inject(FRAME) private frame: any,
              @Inject(DIALOGS) private dialogs: any) {

  }

  ngOnInit() {
    if (Config.IS_MOBILE_NATIVE()) {
      if (this.frame.topmost().ios) {
        this.frame.topmost().ios.controller.visibleViewController.navigationItem.setHidesBackButtonAnimated(true, false);
      }
    }
   // this.logout();
  }

  isOpen = false;

  onTap() {
    this.isOpen = !this.isOpen;
  }


  logout() {
    this.isOpen = false;
    //check whether for real, then logout
    var options = {
      title: 'Logout?',
      okButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    };

    this.userService.logout();
    setTimeout(() => this._router.navigate(['/']), 600);
    //this.router.navigate(['../../login'], {relativeTo: this.route});


  }
  foldFunction(event,ele){
    if(event){
      ele.isFolded = true;
    }else{
      ele.isFolded = false;
    }
  }

}
