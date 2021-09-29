import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArtworksCategoryPage } from './artworks-category.page';

const routes: Routes = [
  {
    path: '',
    component: ArtworksCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtworksCategoryPageRoutingModule {}
