import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoriteArtistPageRoutingModule } from './favorite-artist-routing.module';

import { FavoriteArtistPage } from './favorite-artist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoriteArtistPageRoutingModule
  ],
  declarations: [FavoriteArtistPage]
})
export class FavoriteArtistPageModule {}
