import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { ObsidianApiServiceProvider } from '../../providers/obsidian-api-service/obsidian-api-service';

@Component({
  selector: 'page-program-detail',
  templateUrl: 'program-detail.html',
})
export class ProgramDetailPage {
  program: any;
  ipfsHash: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public obsidianApi: ObsidianApiServiceProvider) {
    //this.program = this.navParams.get('program');
    debugger;
    if(!this.program){
        //this.ipfsHash = this.navParams.get("ipfsHash");
        this.program = obsidianApi.getProgram("QmUVc5syQXfcJdejG2HVkdHhfmMXFgFRnemKTyauPS7znh");//this.ipfsHash);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProgramDetailPage');
  }

  applyToProgram(){
    //debugger;
    //TODO: still need to add logic and get the parameter of the program id
  }
}
