import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { ProgramDetailPage } from '../program-detail/program-detail';
import { ObsidianApiServiceProvider } from '../../providers/obsidian-api-service/obsidian-api-service';
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-programs',
  templateUrl: 'programs.html',
})
export class ProgramsPage {
  programs: Observable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private obsidianServiceAPI: ObsidianApiServiceProvider,
    public events: Events) {
    this.programs =  this.obsidianServiceAPI.getPrograms();
    console.log("Tabs");
    events.subscribe('programCreated', () => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      this.programs =  this.obsidianServiceAPI.getPrograms();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProgramsPage');
  }
  ngOnInit() {
    console.log('onInit ProgramsPage');
  }
  viewProgramDetail(program) {
    this.navCtrl.push(ProgramDetailPage, { program: program });
  }
}
