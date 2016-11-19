import {Injectable, Inject} from "@angular/core";
import {APPSETTINGS} from '../../core/tokens';
import {Config} from '../../core/utils/config';


@Injectable()
export class StorageService {
  constructor(@Inject(APPSETTINGS) private storage: any) {
  }

  set(name: string, data: any) {
    if (Config.IS_MOBILE_NATIVE()) {
      this.storage.setString(name, JSON.stringify(data));
    } else {
      this.storage.setItem(name, JSON.stringify(data));
    }

  }

  get(name: string) {
    if (Config.IS_MOBILE_NATIVE()) {
      if (this.storage.hasKey(name)) {
        return JSON.parse(this.storage.getString(name)) || null;
      } else {
        return null;
      }
    } else {
      return JSON.parse(this.storage.getItem(name)) || null;
    }
  }
}

