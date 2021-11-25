import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AlertController, NavController } from '@ionic/angular';
import { BioPage } from '../bio/bio.page';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  itemRef : any;
  seniors=[];
  uid:string;

  constructor(private db: AngularFireDatabase, private user:UserService,
    private alert:AlertController, public navCtrl: NavController) {
    this.uid = localStorage.getItem("uid")
  }

  ngOnInit(){
    this.itemRef = this.db.object('list/'+this.uid);
    this.itemRef.snapshotChanges().subscribe(action => {
      let data = action.payload.val()
      this.seniors=[];
        for(let k in data){
          let user = data [k];
          user.key = k
          console.log("ID",user.key);
          this.seniors.push(user)
        }
});

  }
  async deleteConfirm(key) {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Espera!',
      message: 'Se esta intentando eliminar esta paciente. Desea continuar?',
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
            this.db.database.ref('list/'+this.uid+'/'+key).remove();
          }
        }
      ]
    });

    await alert.present();
  }


}
