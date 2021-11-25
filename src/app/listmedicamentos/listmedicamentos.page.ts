import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MedicamentosService } from '../services/medicamentos.service';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listmedicamentos',
  templateUrl: './listmedicamentos.page.html',
  styleUrls: ['./listmedicamentos.page.scss'],
})
export class ListmedicamentosPage implements OnInit {


  itemRef : any;
  uid:string;
  medicamentos = [];

  constructor(public active:ActivatedRoute,
    private user:UserService,
    private medicamentoservices:MedicamentosService,
    private db:AngularFireDatabase) { 
      
    this.uid = localStorage.getItem("uid")
  }

  ngOnInit() {
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
