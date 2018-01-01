import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { EquipmentsPage } from '../equipments/equipments';
import { MyEquipmentsPage } from '../myequipments/myequipments';
import { ProgramsPage } from '../programs/programs';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  homeTab = HomePage;
  equipmentsTab = EquipmentsPage;
  myEquipmentsTab = MyEquipmentsPage;
  programsTab = ProgramsPage;
  constructor(public navCtrl: NavController, public navParams: NavParams
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
