import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

const BASE_URL = "https://obsidian-api.azurewebsites.net";
const TRACTOR_URL = `${BASE_URL}/equipments/tractors`;
const PROGRAMS_URL = `${BASE_URL}/equipments/tractors`;
const PROGRAM_URL = `${BASE_URL}/equipments/tractors`;
const SMART_CONTRACT_URL = `${BASE_URL}/smartcontract`;

@Injectable()
export class ObsidianApiServiceProvider {
  
  constructor(public http: HttpClient) {
    console.log('Hello ObsidianApiServiceProvider Provider');
  }

  getSmartContractInfo(){
    return this.http.get(SMART_CONTRACT_URL).toPromise();
  }
  
  getEquipments(){
    return this.http.get(TRACTOR_URL);
  }

  getPrograms(){
      return this.http.get(PROGRAMS_URL);
  }

  getProgram(ipfsHash){
    return this.http.get(`${PROGRAM_URL}/${ipfsHash}`);
  }
}
