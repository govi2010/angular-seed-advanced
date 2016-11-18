import {Component, Output, EventEmitter, AfterViewInit} from '@angular/core';
import {ViewEncapsulation} from "@angular/core";
import {StorageService} from "../../services/storage.service";
declare var uiLoad: any;
declare var screenfull: any;

@Component({
  moduleId: module.id,
  selector: 'app-setting',
  templateUrl: './settings.component.html',
  encapsulation: ViewEncapsulation.None
})

export class SettingsComponent implements AfterViewInit {

  isActive: boolean = false;
  isFullScreen: boolean = false;
  isFolded: boolean = false;

  appSettings: any = {
    setting: {
      folded: false,
      color: 'primary',
      bg: ''
    }
  };

  @Output() foldSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(private _storageService: StorageService) {

  }

  ngAfterViewInit(): void {
    let localData: any = this._storageService.get('appSettings');
    if (localData !== null) {
      this.onColorChange(localData.setting.color);
      this.onBackgroundColorChange(localData.setting.bg);
      this.isFolded = localData.setting.folded;
    }
  }


  active() {
    this.isActive = !this.isActive;
  }

  onColorChange(color) {
    if (color != this.appSettings.setting.color) {
      uiLoad.remove('assets/css/theme/' + this.appSettings.setting.color + '.css');
      uiLoad.load('assets/css/theme/' + color + '.css');
      $('.switcher input[value="' + color + '"]').prop('checked', true);
      this.appSettings.setting.color = color;
      this._storageService.set('appSettings', this.appSettings);
    }
  }

  onBackgroundColorChange(color) {
    if (color != this.appSettings.setting.bg) {
      $('body').removeClass($('body').attr('data-ui-class')).addClass(color).attr('data-ui-class', color);
      $('.switcher input[value="' + color + '"]').prop('checked', true);
      this.appSettings.setting.bg = color;
      this._storageService.set('appSettings', this.appSettings);
    }
  }

  onFold(checked: boolean) {
    this.foldSidebar.emit(checked);
    this.isFolded = checked;
    this.appSettings.setting.folded = checked;
    this._storageService.set('appSettings', this.appSettings);
  }

  onFullScreen() {
    screenfull.toggle();
  }
}
