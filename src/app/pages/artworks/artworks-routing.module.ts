import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArtworksPage } from './artworks.page';

const routes: Routes = [
  {
    path: '',
    component: ArtworksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtworksPageRoutingModule {}
