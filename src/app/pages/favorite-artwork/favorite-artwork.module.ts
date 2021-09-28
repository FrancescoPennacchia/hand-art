import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoriteArtworkPageRoutingModule } from './favorite-artwork-routing.module';

import { FavoriteArtworkPage } from './favorite-artwork.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoriteArtworkPageRoutingModule
  ],
  declarations: [FavoriteArtworkPage]
})
export class FavoriteArtworkPageModule {}
