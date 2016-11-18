import {Injectable} from "@angular/core";

@Injectable()
export class StorageService {
  storage: any;

  constructor() {
    this.storage = localStorage;
  }

  set(name: string, data: any) {
    this.storage.setItem(name, JSON.stringify(data));
  }

  get(name: string) {
    return JSON.parse(this.storage.getItem(name)) || null;
  }
}

