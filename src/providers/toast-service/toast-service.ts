import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class ToastServiceProvider {

  constructor(private toastCtrl: ToastController) {
    console.log('Hello ToastServiceProvider Provider');
  }

  presentToast(message, callback) {
    let toast = this.toastCtrl.create({
      message: message,
      //duration: 3000,
     // showCloseButton: true,
      dismissOnPageChange: true,
      position: 'top',
      cssClass: "custom-toast"
    });
    
    toast.onDidDismiss((data, role) => {
      console.log('Dismissed toast');
      debugger;
      if (role == "close") {
          callback();
      }
    });
  
    toast.present();
  }
}
