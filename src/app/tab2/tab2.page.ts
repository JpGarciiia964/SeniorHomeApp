import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FirestorageService } from '../services/firestorage.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  name:string ='';
  number:string ='';
  edad:string ='';
  gsng:string = '';
  sex:string = '';
  medicamento:string = '';
  cantidad:string = '';
  image:string = '';
  uid:string;
  seniorId:string;
  newImage = "";
  newFile ="";

  constructor(private db:AngularFireDatabase, 
    private user:UserService, 
    private active:ActivatedRoute, 
    public firestorageService:FirestorageService) {
    this.uid = localStorage.getItem('uid')

    active.params.subscribe(key=>{
      console.log("esto es key", key);
      if(key.id!==null){
        console.log("esto es key.id", key.id);
        this.seniorId = key.id;
        console.log("esto es this.seniorId", this.seniorId);
        db.database.ref('list/'+this.uid+"/"+key.id).once('value', (snap)=>{
          console.log("esto es snap.val",snap.val());
          this.name = snap.val().name
          this.number = snap.val().number
          this.edad = snap.val().edad
          this.gsng = snap.val().gsng
          this.sex = snap.val().sex
          this.medicamento = snap.val().medicamento
          this.cantidad = snap.val().cantidad
          
          this.image = snap.val().image
        })
      }
    })

  }

  async save(){

    const path ='Senior';
    const imagename = this.name
    const res =  await this.firestorageService.uploadImage(this.newFile, path, imagename);
    this.image = res;

    this.db.database.ref('list/'+this.uid).push({name:this.name, number:this.number, edad:this.edad, gsng:this.gsng, sex:this.sex, medicamento:this.medicamento, cantidad:this.cantidad, image:this.image}).then(()=> this).then(()=>{
      this.name="";
      this.number="";
      this.edad="";
      this.gsng="";
      this.sex="";
      this.medicamento="";
      this.cantidad="";
      this.image="";

    })
    .catch(e=>{
      console.log(e);
   })
  }
  
  async update(){

    const path ='Senior';
    const imagename = this.name
    const res =  await this.firestorageService.uploadImage(this.newFile, path, imagename);
    this.image = res;

    this.db.database.ref('list/'+this.uid+'/'+this.seniorId).set({name:this.name, number:this.number, edad:this.edad, gsng:this.gsng, sex:this.sex, medicamento:this.medicamento, cantidad:this.cantidad, image:this.image}).then(()=> this).then(()=>{
      this.name="";
      this.number="";
      this.edad="";
      this.gsng="";
      this.sex="";
      this.medicamento="";
      this.cantidad="";
      this.image="";
    })
    .catch(e=>{
      console.log(e);
   })
  }

  async newImageUpload(event: any){
    if (event.target.files && event.target.files[0]){
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ((image) => {
        this.newImage = image.target.result as string;

      });
      reader.readAsDataURL(event.target.files[0]);
    }

  }
  
  }

