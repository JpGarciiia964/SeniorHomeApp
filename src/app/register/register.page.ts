import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private auth:AngularFireAuth, private fb:FormBuilder, 
    private alertController:AlertController, private db:AngularFireDatabase) { }

  registerForm:FormGroup;

  ngOnInit() {
    this.registerForm = this.fb.group({
      name:['', Validators.required],
      mail:['', Validators.required],
      password:['', Validators.required],
      confirm:['', Validators.required]
    })
  }

  register(){
    let user = {
      email:this.registerForm.controls['mail'].value,
      password:this.registerForm.controls['password'].value
    }

    if(user.password == this.registerForm.controls['password'].value ){
      this.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(userData=>{
        this.registerAlert('Success', "El usuario a sido creado correctamente!")
        this.db.database.ref('user/'+userData.user.uid).set(this.registerForm.value)
        console.log(userData);
      }).catch(e=>{
        this.registerAlert('Error', e.message)
        console.log(e);
      })
    }
 
  }

  async registerAlert(status, sms) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: status,
      subHeader: sms,
      buttons: ['OK']
    });

    await alert.present();

}

}