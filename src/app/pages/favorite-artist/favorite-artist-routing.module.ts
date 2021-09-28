import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoriteArtistPage } from './favorite-artist.page';

const routes: Routes = [
  {
    path: '',
    component: FavoriteArtistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoriteArtistPageRoutingModule {}
