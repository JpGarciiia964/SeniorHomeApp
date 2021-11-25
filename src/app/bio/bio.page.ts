import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { Seniors } from '../interfaces/models';
import { BioService } from '../services/bio.service';
import { FirestorageService } from '../services/firestorage.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-bio',
  templateUrl: './bio.page.html',
  styleUrls: ['./bio.page.scss'],
})  
export class BioPage implements OnInit {


  name:string ='';
  number:string ='';
  edad:string ='';
  gsng:string = '';
  sex:string = '';
  medicamento:string = '';
  cantidad:string = '';
  image:string = '';

  itemRef : any;
  seniors=[];
  senior=[];

  uid:string;
  seniorId:string;

  constructor(public db:AngularFireDatabase, 
    private active:ActivatedRoute,
    public firestorageService:FirestorageService,
    private user:UserService) {
    this.uid = localStorage.getItem('uid')

      //active.params.subscribe(key=>{
      //  console.log("esto es key", key);
       // if(key.id!==null){
         // console.log("esto es key.id", key.id);
         // this.seniorId = key.id;
         // db.database.ref('list/'+this.uid+"/"+key.id).once('value',(snap)=>{
          //  console.log("esto es snap.val",snap.val());

          //  this.name = snap.val().name
          //  console.log("esto es name",this.name);
           // this.number = snap.val().number
           // this.edad = snap.val().edad
           // this.gsng = snap.val().gsng
           // this.sex = snap.val().sex
            //this.medicamento = snap.val().medicamento
           // this.cantidad = snap.val().cantidad
            
            //this.image = snap.val().image
            
          //})
        //}
      //})
      
  }
  ngOnInit() {
        
    this.itemRef = this.db.object('list/'+this.uid);
    this.itemRef.snapshotChanges().subscribe(action => {
      let data = action.payload.val()
       this.seniors=[];
        if(data!== null){
        console.log("Data",data)
          for(let k in data){
            let sn = data [k];
            sn.key = k
            console.log("Senior.k: ", sn.key )
           this.seniors.push(sn)
          }
        console.log("ID",this.senior)
        

      }
    });
   


  }  

}

