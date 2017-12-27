import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-program-detail',
  templateUrl: 'program-detail.html',
})
export class ProgramDetailPage {
  program: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.program = this.navParams.get('program');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProgramDetailPage');
  }

  applyToProgram(){
    //debugger;
    //TODO: still need to add logic and get the parameter of the program id
  }
}
