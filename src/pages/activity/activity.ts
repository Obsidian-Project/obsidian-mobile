import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { IventoryDetailPage } from '../iventory-detail/iventory-detail';

@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityPage');
  }

  viewIventoryDetail(){
    this.navCtrl.push(IventoryDetailPage);
    // console.log("hello");
  }
}
