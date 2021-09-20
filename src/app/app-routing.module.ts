import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./pages/folder/folder.module').then(m => m.FolderPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/auth/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./pages/auth/sign-in/sign-in.module').then(m => m.SignInPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/auth/sign-up/sign-up.module').then(m => m.SignUpPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'artworks',
    loadChildren: () => import('./pages/artworks/artworks.module').then(m => m.ArtworksPageModule)
  },
  {
    path: 'artists',
    loadChildren: () => import('./pages/artists/artists.module').then(m => m.ArtistsPageModule)
  },
  {
    path: 'artist-detail:id',
    loadChildren: () => import('./pages/artist-detail/artist-detail.module').then( m => m.ArtistDetailPageModule)
  },
  {
    path: 'artwork-detail:id',
    loadChildren: () => import('./pages/artwork-detail/artwork-detail.module').then( m => m.ArtworkDetailPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
