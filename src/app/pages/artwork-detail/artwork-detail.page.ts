import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ArtworkService} from '../../service/artwork.service';
import {Artwork} from '../../model/artwork/artwork.model';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import {File} from '@ionic-native/file/ngx';
import {AlertController, ModalController, Platform} from '@ionic/angular';
import {SocialShareComponent} from '../../components/social-share/social-share.component';
import {OperaPreferita} from '../../model/artwork/operaPreferita';
import {UtenteService} from '../../service/utente.service';
import {UtenteResponse} from '../../model/utenteResponse.model';
import {Utente} from '../../model/utente.model';

declare var cordova: any;

@Component({
  selector: 'app-artwork-detail',
  templateUrl: './artwork-detail.page.html',
  styleUrls: ['./artwork-detail.page.scss'],
  providers: [FileTransfer, FileTransferObject, File]
})
export class ArtworkDetailPage implements OnInit {

  private idArtwork: string;
  public artwork: Artwork;
  public favorite: OperaPreferita = null;
  private favorita: OperaPreferita = null;
  private utente: UtenteResponse = null;
  storageDirectory = '';

  constructor(private route: ActivatedRoute,
              private artworkService: ArtworkService,
              private location: Location,
              public platform: Platform,
              private file: File,
              private transfer: FileTransfer,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController,
              private utenteService: UtenteService,
              private router: Router
  ) {
    // this.artwork = new Artwork();
    this.platform.ready().then(() => {
      // make sure this is on a device, not an emulation (e.g. chrome tools device mode)
      if (!this.platform.is('cordova')) {
        return false;
      }

      if (this.platform.is('ios')) {
        this.storageDirectory = cordova.file.documentsDirectory;
      }
      else if (this.platform.is('android')) {
        this.storageDirectory = cordova.file.dataDirectory;
      }
      else {
        // exit otherwise, but you could add further types here e.g. Windows
        console.log('Windows non implementato');
        return false;
      }
    });
    // this.favorite = null;
  }



  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idArtwork = params.get('id');
      // console.log(this.idArtwork);
    });
    this.artworkService.getArtworkByIdGraph(this.idArtwork).subscribe(res => {
      this.artwork = res;
      this.artwork.images[0].image_url = this.artwork.images[0].image_url.replace(':version', 'medium');
      // console.log(this.artwork.images[0].image_url);

      this.utenteService.getUtente().subscribe((utente) => {
        this.utente = utente;
      });


      if ( this.utente != null ) {
        console.log('Utente loggato');
        this.favorita = new OperaPreferita();
        this.artworkService.getFavoriteArtwork(this.utente.id_utente, this.artwork.id).subscribe((operapref) => {
          this.favorita = operapref;
        });
      }
    });
  }

  lastPage(){
    this.location.back();
  }

  favoriteButtonAdd(art: Artwork){
    if ( this.utente == null ){
      console.log('Non loggato');
      this.router.navigate(['/sign-in']);
    } else {
      this.favorite = new OperaPreferita();
      this.favorite.image = art.images[0].image_url;
      this.favorite.titolo = art.title;
      this.favorite.id_opera = art.id;
      this.favorite.id_utente = this.utente.id_utente;

      // console.log(this.favorite.utente);
      this.artworkService.addFavoriteArtwork(this.favorite).subscribe((favorite) => {
        this.favorite = favorite;
      });
      setTimeout(() => {
        // console.log('Async operation has ended');
        window.location.reload();
      }, 1000);
    }
  }

  favoriteButtonDel(){
    // console.log(this.favorita.id);
    this.artworkService.deleteFavoriteArtwork(this.favorita.id).subscribe(() => {
      this.favorita = null;
    });
    // window.location.reload();

  }

  async downloadIMG(){
    const fileTransfer: FileTransferObject = this.transfer.create();
    const url = this.artwork.images[0].image_url;
    fileTransfer.download(url, this.storageDirectory + 'file.png').then(async (entry) => {
      const alertSuccess = await this.alertCtrl.create({
        header: `Download Succeeded!`,
        subHeader: `successfully downloaded to: ${entry.toURL()}`,
        buttons: ['Ok']
      });
      await alertSuccess.present();
    }, async (error) => {
      const alertFail = await this.alertCtrl.create({
        header: `Download Fail!`,
        subHeader: `Download Fail!`,
        buttons: ['Ok']
      });
      await alertFail.present();
    });

  }

  async showShareOptions(artwork: Artwork) {
    const modal = await this.modalCtrl.create({
      component: SocialShareComponent,
      cssClass: 'backTransparent',
      backdropDismiss: true,
    });
    return modal.present();
  }


}
