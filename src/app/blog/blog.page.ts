import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LoadingController } from '@ionic/angular';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.page.html',
  styleUrls: ['./blog.page.scss'],
})
export class BlogPage implements OnInit {
  helpUrl: any;

  constructor(private sanitizer: DomSanitizer, public loadingController: LoadingController) { }

  ngOnInit() {

    this.presentLoading();
    this.helpUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://residencia-bethania.negocio.site/');    
  }

  async presentLoading() {
    const loading = await this.loadingController.create({      
      message: 'Por favor espere...',
      duration: 3000
    });
    await loading.present();
    }

}
