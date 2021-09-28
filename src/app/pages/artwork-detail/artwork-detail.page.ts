import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute, ParamMap} from '@angular/router';
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
  public favorite: OperaPreferita;
  private utente: UtenteResponse;
  private utenteAppo: Utente;
  storageDirectory = '';

  constructor(private route: ActivatedRoute,
              private artworkService: ArtworkService,
              private location: Location,
              public platform: Platform,
              private file: File,
              private transfer: FileTransfer,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController,
              private utenteService: UtenteService
  ) {
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
      console.log(this.idArtwork);
    });

    this.artworkService.getArtworkByIdGraph(this.idArtwork).subscribe(res => {
      this.artwork = res;
      this.artwork.images[0].image_url = this.artwork.images[0].image_url.replace(':version', 'medium');
      // console.log(this.artwork.images[0].image_url);
    });
  }

  lastPage(){
    this.location.back();
  }

  favoriteButton(art: Artwork){
    this.favorite = new OperaPreferita();
    this.utenteAppo = new Utente();

    this.favorite.image = art.images[0].image_url;
    this.favorite.titolo = art.title;
    this.favorite.id_opera = art.id;

    this.utenteService.getUtente().subscribe((utente) => {
      this.utente = utente;
    });

    this.utenteAppo.nome = this.utente.nome;
    this.utenteAppo.email = this.utente.email;
    this.utenteAppo.cognome = this.utente.cognome;
    this.utenteAppo.username = this.utente.username;
    this.utenteAppo.password = '$2a$10$.529rofBLODfxwtg6jzAS.futsREaoKjiORBop8TBjvu5qclAVIA6';
    this.favorite.utente = new Utente();
    this.favorite.utente = this.utenteAppo;

    // console.log(this.favorite.utente);
    this.artworkService.addFavoriteArtwork(this.favorite).subscribe((favorite) => {

    });
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
