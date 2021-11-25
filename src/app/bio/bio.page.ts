import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute } from '@angular/router';
import { FirestorageService } from '../services/firestorage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.page.html',
  styleUrls: ['./bio.page.scss'],
})
export class BioPage implements OnInit {

  seniors=[];
  uid:string;
  seniorId:string;
  userPosts;
  itemRef : any;

  constructor(private db: AngularFireDatabase, 
    private user:UserService,
    private active:ActivatedRoute,
    public firestorageService:FirestorageService, 
    private afs:AngularFireStorage) { 
      
      this.uid = localStorage.getItem("uid")
      console.log(this.uid);

      active.params.subscribe(key=>{
        console.log( "esto es key 1", key);
        console.log("esto es key.id 1", key.id);
        if(key.id!==null){
          console.log("esto es key.id", key.id);
          this.seniorId = key.id;
          console.log("esto es this.seniorId", this.seniorId);
          db.database.ref('list/'+this.uid+"/"+key.id).once('value', (snap)=>{
            console.log("esto es sanp.val",snap.val());

          })
        }
      })
      
      
  }

  ngOnInit() {
    
  }  


}
