import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicamentosService {

  itemRef : any;
  uid:string;
  medicamentos = [];

  constructor(private fs:AngularFireStorage, 
    private db:AngularFireDatabase, ) { 
      this.uid = localStorage.getItem("uid")
    }

  getMedicamentos() {
    this.itemRef = this.db.object('medicamentos/'+this.uid)
    this.itemRef.snapshotChanges().subscribe(action => {
      let data = action.payload.val()
      this.medicamentos=[];
        for(let k in data){
          let user = data [k];
          user.key = k
          console.log(user);
          this.medicamentos.push(user)
        }
});

  }
}
