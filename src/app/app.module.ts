import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Push } from '@ionic-native/push';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';

import { DetailsPage } from '../pages/details/details';
import { EquipmentsPage } from '../pages/equipments/equipments';
import { MyEquipmentsPage } from '../pages/myequipments/myequipments';
import { ProgramsPage } from '../pages/programs/programs';
import { ProgramDetailPage } from '../pages/program-detail/program-detail';
import { EquipmentDetailPage } from '../pages/equipment-detail/equipment-detail';
import { IventoryDetailPage } from '../pages/iventory-detail/iventory-detail';

import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpClientModule } from '@angular/common/http';
import { ObsidianApiServiceProvider } from '../providers/obsidian-api-service/obsidian-api-service';
import { Web3ServiceProvider } from '../providers/web3-service/web3-service';
import { ToastServiceProvider } from '../providers/toast-service/toast-service';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailsPage,
    EquipmentsPage,
    MyEquipmentsPage,
    ProgramsPage,
    ProgramDetailPage,
    EquipmentDetailPage,
    TabsPage,
    IventoryDetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailsPage,
    EquipmentsPage,
    MyEquipmentsPage,
    ProgramsPage,
    ProgramDetailPage,
    EquipmentDetailPage,
    TabsPage,
    IventoryDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ObsidianApiServiceProvider,
    Push,
    LocalNotifications,
    ToastServiceProvider,
    Web3ServiceProvider
  ]
})
export class AppModule {}
