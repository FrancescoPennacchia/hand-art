import { Component, OnInit } from '@angular/core';
import {UtenteService} from '../../service/utente.service';
import {Utente} from '../../model/utente.model';
import {UtenteResponse} from '../../model/utenteResponse.model';
import {OperaPreferita} from '../../model/artwork/operaPreferita';
import {ArtworkService} from '../../service/artwork.service';

@Component({
  selector: 'app-favorite-artwork',
  templateUrl: './favorite-artwork.page.html',
  styleUrls: ['./favorite-artwork.page.scss'],
})
export class FavoriteArtworkPage implements OnInit {
  private utente: UtenteResponse;
  public artworks: Array<OperaPreferita>;

  constructor(private utenteService: UtenteService,
              private artworkService: ArtworkService
  ) { }

  ngOnInit() {
    this.utenteService.getUtente().subscribe((utente) => {
      this.utente = utente;
    });

    this.artworkService.getFavoritesArtworks(this.utente.id_utente).subscribe(data => {
      this.artworks = data;
    });
  }

}
