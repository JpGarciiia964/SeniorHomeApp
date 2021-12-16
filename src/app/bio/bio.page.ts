import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { Seniors } from '../interfaces/models';
import { BioService } from '../services/bio.service';
import { FirestorageService } from '../services/firestorage.service';
import { UserService } from '../services/user.service';
import { ModalController, NavParams } from '@ionic/angular';
import { MedicmodalPage } from '../medicmodal/medicmodal.page';




@Component({
  selector: 'app-bio',
  templateUrl: './bio.page.html',
  styleUrls: ['./bio.page.scss'],
})  
export class BioPage implements OnInit {



  itemRef : any;
  seniors=[];
  medicamentos=[];
  medic=[];

  nombre:string;
  cantidad:string;

  uid:string;
  seniorId:string;

  constructor(public db:AngularFireDatabase, 
    private active:ActivatedRoute,
    public firestorageService:FirestorageService,
    private user:UserService,
    public modal:ModalController) {
    this.uid = localStorage.getItem('uid')


    //this.medic = navParams.get('data')
    //console.log(this.medic)
  }

  ngOnInit() { 

    let idenviado = this.active.snapshot.paramMap.get('id');
    console.log("Esto es lo que capturo",idenviado)
    
    this.itemRef = this.db.object('list/'+this.uid+'/'+idenviado);
    this.itemRef.snapshotChanges().subscribe(action=>{
      let data = action.payload.val()
      console.log(data)
      this.seniors=[];
      this.seniors.push(data)

     
      
    });
  }  

  async openModal(){
    const modal = await this.modal.create({
      component: MedicmodalPage,
      cssClass: 'modal-class'
    });
     await modal.present();

     const { data } = await modal.onDidDismiss();
     console.log("Esto es el medicamento que capturo",data)
     this.medic = [];
     for(let k in data){
      let med = data [k];
      med.key = k
      this.medic.push(med)
      console.log("Nombre",med)
     }
   
      
     
  } 


}

