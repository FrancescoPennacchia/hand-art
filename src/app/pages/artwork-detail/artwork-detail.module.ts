import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArtworkDetailPageRoutingModule } from './artwork-detail-routing.module';

import { ArtworkDetailPage } from './artwork-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArtworkDetailPageRoutingModule
  ],
  declarations: [ArtworkDetailPage]
})
export class ArtworkDetailPageModule {}
