import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class ObsidianApiServiceProvider {
  baseUrl: string = "https://obsidian-api.azurewebsites.net/equipments/tractors";

  constructor(public http: HttpClient) {
    console.log('Hello ObsidianApiServiceProvider Provider');
  }

  getEquipments(){
    return this.http.get(this.baseUrl);
  }

  getPrograms(){
      return this.http.get(this.baseUrl);
  }
}
