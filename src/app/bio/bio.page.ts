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

}

