import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uid:string;

  constructor() { }

  //set & get optener data de usuarios
  setUid(_uid:string){
    this.uid = _uid
  }
  getUid(){
    return this.uid
  }

}
