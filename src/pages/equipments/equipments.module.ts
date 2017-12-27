import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EquipmentsPage } from './equipments';

@NgModule({
  declarations: [
    EquipmentsPage,
  ],
  imports: [
    IonicPageModule.forChild(EquipmentsPage),
  ],
})
export class EquipmentsPageModule {}
