import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { BioPage } from '../bio/bio.page';
import { FirestorageService } from '../services/firestorage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.page.html',
  styleUrls: ['./medicamentos.page.scss'],
})
export class MedicamentosPage implements OnInit {

  nombre:string='';
  stock:string='';
  lote:string='';
  expire:string='';
  medicamentoId:string;
  uid: string;
  newImage = "";
  newFile ="";
  image:string = '';

  constructor(private db:AngularFireDatabase, 
    private user:UserService, 
    private active:ActivatedRoute, 
    public firestorageService:FirestorageService) { 
      this.uid = localStorage.getItem('uid')

      active.params.subscribe(key=>{
        console.log(key);
        if(key.id!==null){
          console.log("esto es key.id", key.id);
          this.medicamentoId = key.id;
          console.log("esto es this.medicamentoId", this.medicamentoId);
          db.database.ref('medicamentos/'+this.uid+"/"+key.id).once('value', (snap)=>{
            console.log(snap.val());
            this.nombre = snap.val().nombre
            this.stock = snap.val().stock
            this.lote = snap.val().lote
            this.expire = snap.val().expire
            this.image = snap.val().image
  
          })
        }
      })
    }
    

  ngOnInit() {
  
  }

  async save(){

    const path ='Medicamento';
    const imagename = this.nombre
    const res =  await this.firestorageService.uploadImage(this.newFile, path, imagename);
    this.image = res;

    this.db.database.ref('medicamentos/'+this.uid).push({nombre:this.nombre, stock:this.stock, lote:this.lote, expire:this.expire, image:this.image}).then(()=> this).then(()=>{
      this.nombre="";
      this.stock="";
      this.lote="";
      this.expire="";
      this.image="";

    })
    .catch(e=>{
      console.log(e);
   })
  }

  async update(){

    const path ='Medicamentos';
    const imagename = this.nombre
    const res =  await this.firestorageService.uploadImage(this.newFile, path, imagename);
    this.image = res;

    this.db.database.ref('medicamentos/'+this.uid+'/'+this.medicamentoId).set({nombre:this.nombre, stock:this.stock, lote:this.lote, expire:this.expire, image:this.image}).then(()=> this).then(()=>{
      this.nombre="";
      this.stock="";
      this.lote="";
      this.expire="";
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
