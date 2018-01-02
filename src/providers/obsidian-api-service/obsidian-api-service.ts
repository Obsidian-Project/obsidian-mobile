import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

const BASE_URL = "https://obsidian-api.azurewebsites.net";
const TRACTOR_URL = `${BASE_URL}/equipments/tractors`;
const PROGRAMS_URL = `${BASE_URL}/programs`;
const SMART_CONTRACT_URL = `${BASE_URL}/smartcontract`;
const MY_EQUIPMENTS_URL =  `${BASE_URL}/myequipments`;
const ACCOUNT_INFO = `${BASE_URL}/accountInfo`;

@Injectable()
export class ObsidianApiServiceProvider {
  
  constructor(public http: HttpClient) {
    console.log('Hello ObsidianApiServiceProvider Provider');
  }

  getSmartContractInfo(){
    return this.http.get(SMART_CONTRACT_URL).toPromise();
  }
  
  getAccountInfo(){
    return this.http.get(ACCOUNT_INFO).toPromise();
  }
  getEquipments(){
    return this.http.get(TRACTOR_URL);
  }

  getPrograms(){
      return this.http.get(PROGRAMS_URL);
  }
  getMyEquipments(){
    return this.http.get(MY_EQUIPMENTS_URL);    
  }
  
  getEquipment(equipmentId){
    return this.http.get(`${BASE_URL}/equipments/tractors/${equipmentId}`);    
  }

  getProgram(ipfsHash){    
    let url = `${PROGRAMS_URL}/${ipfsHash}`;
    return this.http.get(url).toPromise();
  }
}
