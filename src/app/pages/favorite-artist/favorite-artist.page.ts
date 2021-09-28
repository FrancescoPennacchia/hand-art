import { Component, OnInit } from '@angular/core';
import {UtenteService} from '../../service/utente.service';
import {UtenteResponse} from '../../model/utenteResponse.model';
import {ArtistaPreferito} from '../../model/artist/artistaPreferito';
import {ArtistService} from '../../service/artist.service';

@Component({
  selector: 'app-favorite-artist',
  templateUrl: './favorite-artist.page.html',
  styleUrls: ['./favorite-artist.page.scss'],
})
export class FavoriteArtistPage implements OnInit {
  private utente: UtenteResponse;
  public artists: Array<ArtistaPreferito>;

  constructor(private utenteService: UtenteService,
              private artistService: ArtistService
              ) { }

  ngOnInit() {
    this.utenteService.getUtente().subscribe((utente) => {
      this.utente = utente;
    });

    this.artistService.getFavoritesArtists(this.utente.id_utente).subscribe( (data) => {
      this.artists = data;
    });
  }

}
