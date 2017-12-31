import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
//import { IventoryDetailPage } from '../iventory-detail/iventory-detail';
import { ObsidianApiServiceProvider } from '../../providers/obsidian-api-service/obsidian-api-service';

@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage {
  equipments: Observable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private obsidianServiceAPI: ObsidianApiServiceProvider) {
    this.equipments =  this.obsidianServiceAPI.getMyEquipments();
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityPage');
  }

  viewIventoryDetail(){
    //this.navCtrl.push(IventoryDetailPage);
    // console.log("hello");
  }
}
