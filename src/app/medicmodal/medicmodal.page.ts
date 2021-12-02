import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ModalController } from '@ionic/angular';



@Component({
  selector: 'app-medicmodal',
  templateUrl: './medicmodal.page.html',
  styleUrls: ['./medicmodal.page.scss'],
})
export class MedicmodalPage implements OnInit {

  itemRef : any;
  medicamentos=[];
  uid:string;


  constructor(public db:AngularFireDatabase,
    public modal:ModalController) { 
      this.uid = localStorage.getItem('uid')
    }

  ngOnInit() {
    this.itemRef = this.db.object('medicamentos/'+this.uid);
    this.itemRef.snapshotChanges().subscribe(action => {
      let data = action.payload.val()
      this.medicamentos=[];
        for(let k in data){
          let medicamento = data [k];
          medicamento.key = k
          this.medicamentos.push(medicamento)
        }
});
  }

  closeModal(){
    this.modal.dismiss();
  }
}
