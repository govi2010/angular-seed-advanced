import {Component, ViewEncapsulation, Input} from "@angular/core";
import {StorageService} from "../../services/storage.service";
import {BaseComponent} from '../../../core/decorators/base.component';

@BaseComponent({
  moduleId: module.id,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  encapsulation: ViewEncapsulation.None

})
export class SidebarComponent {
  @Input() isFolded: boolean = false;

  constructor(private _storageService: StorageService) {
    let localData: any = this._storageService.get('appSettings');
    if (localData !== null) {
      this.isFolded = localData.setting.folded;
    }
  }
}


