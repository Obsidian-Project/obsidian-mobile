import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { ProgramDetailPage } from '../program-detail/program-detail';
import { ObsidianApiServiceProvider } from '../../providers/obsidian-api-service/obsidian-api-service';

@Component({
  selector: 'page-programs',
  templateUrl: 'programs.html',
})
export class ProgramsPage {
  programs: Observable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private obsidianServiceAPI: ObsidianApiServiceProvider) {
    this.programs =  this.obsidianServiceAPI.getPrograms();
    //this should be from Blockchain and web3 but for testing and rendering
    //i can try this one
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProgramsPage');
  }

  viewProgramDetail(program) {
    this.navCtrl.push(ProgramDetailPage, { program: program });
  }
}
