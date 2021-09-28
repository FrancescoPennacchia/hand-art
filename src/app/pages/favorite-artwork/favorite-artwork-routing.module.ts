import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoriteArtworkPage } from './favorite-artwork.page';

const routes: Routes = [
  {
    path: '',
    component: FavoriteArtworkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoriteArtworkPageRoutingModule {}
