import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FirestorageService } from '../services/firestorage.service';
import { ThrowStmt } from '@angular/compiler';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  itemRef : any;
  medicamentos=[];
  uid:string;
  
  constructor(private db: AngularFireDatabase, private user:UserService,
    private alert:AlertController, public navCtrl: NavController) { 
      this.uid = localStorage.getItem("uid")
    }
  
  ngOnInit() {
    this.itemRef = this.db.object('medicamentos/'+this.uid);
    this.itemRef.snapshotChanges().subscribe(action => {
      let data = action.payload.val()
      this.medicamentos=[];
        for(let k in data){
          let medicamento = data [k];
          medicamento.key = k
          console.log("ID",medicamento.key);
          this.medicamentos.push(medicamento)
        }
  });
}

async deleteConfirm(key) {
  const alert = await this.alert.create({
    cssClass: 'my-custom-class',
    header: 'Espera!',
    message: 'Se esta intentando eliminar este medicamento. Desea continuar?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Eliminar',
        handler: () => {
          console.log('Confirm Okay');
          this.db.database.ref('medicamentos/'+this.uid+'/'+key).remove();
        }
      }
    ]
  });

  await alert.present();
}


}