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
  seniors=[];


  constructor(public db:AngularFireDatabase,
    public modal:ModalController) { 
      this.uid = localStorage.getItem('uid')
      this.getSenior()
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

  enviarMedicamento(){
    this.modal.dismiss(this.medicamentos);
  }

  getSenior(){
     this.itemRef = this.db.object('list/'+this.uid);
     this.itemRef.snapshotChanges().subscribe(action => {
       let data =action.payload.val()
       this.seniors=[];
       for(let k in data){
         let senior = data [k];
         senior.key = k
         this.seniors.push(senior)
       }
     })
  }

  
}
