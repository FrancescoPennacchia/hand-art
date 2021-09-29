import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Artist} from '../../model/artist/artist.model';
import {ArtistService} from '../../service/artist.service';
import {UtenteResponse} from '../../model/utenteResponse.model';
import {ArtistaPreferito} from '../../model/artist/artistaPreferito';
import {AlertController, ModalController} from '@ionic/angular';
import {UtenteService} from '../../service/utente.service';
import {Artwork} from '../../model/artwork/artwork.model';
import {SocialShareComponent} from '../../components/social-share/social-share.component';
import {OperaPreferita} from '../../model/artwork/operaPreferita';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.page.html',
  styleUrls: ['./artist-detail.page.scss'],
})
export class ArtistDetailPage implements OnInit {

  private idArtist: string;
  public artist: Artist;
  private utente: UtenteResponse;
  public favorite: ArtistaPreferito = null;
  private favorita: ArtistaPreferito = null;

  constructor(private route: ActivatedRoute,
              private artistService: ArtistService,
              private location: Location,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController,
              private utenteService: UtenteService,
              private router: Router
              ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idArtist = params.get('id');
    });

    this.artistService.getArtistByIdGraph(this.idArtist).subscribe(res => {
      this.artist = res;
      // this.artist.image.url = this.artist.image.url.replace('tall', 'large');
      // console.log (this.artist.image.url );
      this.utenteService.getUtente().subscribe((utente) => {
        this.utente = utente;
      });

      if ( this.utente != null ) {
        // console.log('Utente loggato');
        // console.log(this.utente.id_utente);
        // console.log(this.artist.id);
        this.favorita = new ArtistaPreferito();
        this.artistService.getFavoriteArtist(this.utente.id_utente, this.artist.id).subscribe((artistpref) => {
          this.favorita = artistpref;
        });
      }
    });
  }

  lastPage(){
      this.location.back();
  }

  favoriteButtonAdd(art: Artist){
    this.utenteService.getUtente().subscribe((utente) => {
      this.utente = utente;
    });

    if ( this.utente == null ) {
      console.log('Non loggato');
      this.router.navigate(['/sign-in']);
    } else {
      this.favorite = new ArtistaPreferito();
      this.favorite.image = art.image.url;
      this.favorite.nome = art.name;
      this.favorite.id_autore = art.id;
      this.favorite.id_utente =  this.utente.id_utente;
      this.artistService.addFavoriteArtist(this.favorite).subscribe((favorite) => {
        this.favorite = favorite;
      });
      setTimeout(() => {
        console.log('Async operation has ended');
        window.location.reload();
      }, 1000);
    }

  }

  favoriteButtonDel(){
      this.artistService.deleteFavoriteArtist((this.favorita.id)).subscribe(() => {
        this.favorita = null;
    });
  }

  async showShareOptions(artist: Artist) {
    const modal = await this.modalCtrl.create({
      component: SocialShareComponent,
      cssClass: 'backTransparent',
      backdropDismiss: true,
    });
    return modal.present();
  }

}
