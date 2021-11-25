import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FirestorageService } from '../services/firestorage.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  nombre:string='';
  stock:string='';
  lote:string='';
  expire:string='';
  seniorId:string;
  uid: string;



  constructor(private db:AngularFireDatabase, 
    private user:UserService, 
    private active:ActivatedRoute, 
    public firestorageService:FirestorageService) {
      
    this.uid = localStorage.getItem('uid')

      active.params.subscribe(key=>{
        console.log(key);
        if(key.id!==null){
          console.log("esto es key.id", key.id);
          this.seniorId = key.id;
          console.log("esto es this.seniorId", this.seniorId);
          db.database.ref('medicamentos/'+this.uid+"/"+key.id).once('value', (snap)=>{
            console.log(snap.val());
            this.nombre = snap.val().nombre
            this.stock = snap.val().stock
            this.lote = snap.val().lote
            this.expire = snap.val().expire

          })
        }
      })
    }


    save(){
      this.db.database.ref('medicamentos/'+this.uid).push({nombre:this.nombre, stock:this.stock, lote:this.lote, expire:this.expire}).then(()=> this).then(()=>{
        this.nombre="";
        this.stock="";
        this.lote="";
        this.expire="";
      })
      .catch(e=>{
        console.log(e);
     })
    }

    
  

}
