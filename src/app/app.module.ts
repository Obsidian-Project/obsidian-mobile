import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';

import { DetailsPage } from '../pages/details/details';
import { EquipmentsPage } from '../pages/equipments/equipments';
import { ActivityPage } from '../pages/activity/activity';
import { ProgramsPage } from '../pages/programs/programs';
import { ProgramDetailPage } from '../pages/program-detail/program-detail';
import { EquipmentDetailPage } from '../pages/equipment-detail/equipment-detail';

import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailsPage,
    EquipmentsPage,
    ActivityPage,
    ProgramsPage,
    ProgramDetailPage,
    EquipmentDetailPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailsPage,
    EquipmentsPage,
    ActivityPage,
    ProgramsPage,
    ProgramDetailPage,
    EquipmentDetailPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
