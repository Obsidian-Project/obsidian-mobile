import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { ProgramDetailPage } from '../program-detail/program-detail';

@Component({
  selector: 'page-programs',
  templateUrl: 'programs.html',
})
export class ProgramsPage {
  programs: Observable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient) {
    this.programs = this.httpClient.get('http://localhost:3000/equipments/tractors');
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
