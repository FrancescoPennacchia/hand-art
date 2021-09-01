import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArtworksPageRoutingModule } from './artworks-routing.module';

import { ArtworksPage } from './artworks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArtworksPageRoutingModule
  ],
  declarations: [ArtworksPage]
})
export class ArtworksPageModule {}
