import {Inject, trigger, style, animate, state, transition, keyframes, ViewChild, ElementRef, OnInit} from '@angular/core';
import {BaseComponent} from '../../../core/decorators/base.component';
import {LogService} from '../../../core/services/log.service';
import {FRAME, DIALOGS} from '../../../core/tokens';
import {Observable} from 'rxjs/Observable';
import {Config} from '../../../core/utils/config';
import {Router} from '@angular/router';


@BaseComponent({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.css']
})
export class HomeComponent implements OnInit {


  constructor(private logger: LogService,
              private _router: Router,
              @Inject(FRAME) private frame: any,
              @Inject(DIALOGS) private dialogs: any
            ) {}

 ngOnInit() {
    if (Config.IS_MOBILE_NATIVE()) {
      if (this.frame.topmost().ios) {
          this.frame.topmost().ios.controller.visibleViewController.navigationItem.setHidesBackButtonAnimated(true, false);
      }
    }
  }

isOpen = false;

onTap() {
  this.isOpen = !this.isOpen;
}


logout(){
    this.isOpen = false;
    //check whether for real, then logout
    var options = {
      title: 'Logout?',
      okButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    };
    this.dialogs.confirm(options).then((result: any) => {
      //navigate
      this._router.navigate(["/"]);
    });

}


}
