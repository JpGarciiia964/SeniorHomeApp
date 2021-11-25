import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Injectable({
  providedIn: 'root'
})
export class BioService {

  

  uid:string;
  //seniorBio = {} as Senior;

  constructor( private db: AngularFireStorage, 
    private afAuth: AngularFireAuth) { }

   //set & get optener data de usuarios
   setUid(_uid:string){
    this.uid = _uid
  }
  getUid(){
    return this.uid
  }

  //asignarSeniorBio(senior: Senior) {
  //  this.seniorBio = senior
  //}
}
