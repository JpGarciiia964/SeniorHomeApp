import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private Auth: AngularFireAuth,
    private router:Router,
    private user:UserService
  ) {
    this.verifyCurrentUser();
  }


  verifyCurrentUser(){
    this.Auth.authState.subscribe((e:any)=>{
      if(e==null){
        this.router.navigate(['/login'])
      }else{
        this.user.setUid(e.uid)
        localStorage.setItem("uid", e.uid)
        this.router.navigate(['/'],{replaceUrl:true})
      }
      
    })
  }
}
