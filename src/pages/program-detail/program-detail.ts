import { Component } from '@angular/core';
import {  NavController, NavParams, LoadingController } from 'ionic-angular';
import { ObsidianApiServiceProvider } from '../../providers/obsidian-api-service/obsidian-api-service';
import { Observable } from 'rxjs/Observable';
import { Web3ServiceProvider } from '../../providers/web3-service/web3-service';

@Component({
  selector: 'page-program-detail',
  templateUrl: 'program-detail.html',
})
export class ProgramDetailPage {
  program: any;
  ipfsHash: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public obsidianApi: ObsidianApiServiceProvider,
    private web3Service: Web3ServiceProvider,
    public loadingCtrl: LoadingController) {
    //this.program = this.navParams.get('program');
    //debugger;
    // if(!this.program){
    //     //this.ipfsHash = this.navParams.get("ipfsHash");
        
    //   }
      this.program = obsidianApi.getProgram("Qma9deZjtNs5Dy63wdQgiaGqJcNKNveC7PrrwTCKMKYcqr");//this.ipfsHash);
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProgramDetailPage');
  }

  applyToProgram(){
    this.loading();
    this.web3Service.applyForProgram(this.program.programId)
      .then((result)=>{
        //show sucesss message, an alert maybe, and you click and see the details
      })
    //debugger;
    //TODO: still need to add logic and get the parameter of the program id
  }

  loading() {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Requesting equipment',     
      showBackdrop: true,
      cssClass:'loader',
    });
  
    loading.present();
    }
}
