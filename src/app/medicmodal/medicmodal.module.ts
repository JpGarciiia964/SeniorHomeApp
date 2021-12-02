import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicmodalPageRoutingModule } from './medicmodal-routing.module';

import { MedicmodalPage } from './medicmodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicmodalPageRoutingModule
  ],
  declarations: [MedicmodalPage]
})
export class MedicmodalPageModule {}
