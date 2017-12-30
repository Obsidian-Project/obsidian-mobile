import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ObsidianApiServiceProvider } from '../../providers/obsidian-api-service/obsidian-api-service';
import { Observable } from 'rxjs/Observable';
import { Web3ServiceProvider } from '../../providers/web3-service/web3-service';
import 'rxjs/Rx';

@Component({
  selector: 'page-program-detail',
  templateUrl: 'program-detail.html',
})
export class ProgramDetailPage {
  program: any;
  parameter: any;
  ipfsHash: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public obsidianApi: ObsidianApiServiceProvider,
    private web3Service: Web3ServiceProvider,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
    this.parameter = this.navParams.get('program');
    this.ipfsHash = this.parameter.ipfsHash;   
    obsidianApi.getProgram(this.ipfsHash).then((res) =>{
      this.program = res;
      //TODO: need to move this to the API, so that the API has the responsibility
      this.program.programId = this.parameter.programId;
      this.program.ipfsHash = this.parameter.ipfsHash;
      this.program.finalPrice = ((this.program.selectedEquipment.price - this.program.subsidyAmount) / 2).toFixed(2);
    })    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProgramDetailPage');
  }

  applyToProgram(program) {
    let loader = this.getLoaderInstance();
    console.log(this.program.programId);
    loader.present();
    this.web3Service.applyForProgram(this.program.programId)
      .then((result) => {
          loader.dismiss();       
      });
    // setTimeout(() => {
    //   loader.dismiss();
    // }, 3000);
  }
  
  getLoaderInstance() {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Requesting equipment',
      duration: 3000,
      showBackdrop: true,
      cssClass: 'loader',
    });
    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
      this.presentAlert();
    });
    return loading;
  }

  presentAlert() {//TODO: move to a service, duplication of code
    let alert = this.alertCtrl.create({
      subTitle: 'Your request has been sent',
      enableBackdropDismiss: false,     
      buttons: [
        {
          text: 'Ok',         
          handler: () => {
            let navTransition = alert.dismiss();
            navTransition.then(() => {
              this.navCtrl.pop();
            });
            return false;
          }
        }
      ]
    });

    alert.present();
  }
}
