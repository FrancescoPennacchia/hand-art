import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArtworkDetailPage } from './artwork-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ArtworkDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtworkDetailPageRoutingModule {}
