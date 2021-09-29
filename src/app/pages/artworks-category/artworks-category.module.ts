import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArtworksCategoryPageRoutingModule } from './artworks-category-routing.module';

import { ArtworksCategoryPage } from './artworks-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArtworksCategoryPageRoutingModule
  ],
  declarations: [ArtworksCategoryPage]
})
export class ArtworksCategoryPageModule {}
