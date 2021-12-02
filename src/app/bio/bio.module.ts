import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BioPageRoutingModule } from './bio-routing.module';

import { BioPage } from './bio.page';

import { MedicmodalPage } from '../medicmodal/medicmodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BioPageRoutingModule
  ],
  entryComponents: [
    MedicmodalPage,
  ],
  declarations: [BioPage,
    MedicmodalPage,
  ]
})
export class BioPageModule {}
