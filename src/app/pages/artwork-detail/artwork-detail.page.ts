import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ArtworkService} from '../../service/artwork.service';
import {Artwork} from '../../model/artwork/artwork.model';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import {File} from '@ionic-native/file/ngx';
import {AlertController, ModalController, Platform} from '@ionic/angular';
import {SocialShareComponent} from '../../components/social-share/social-share.component';

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
  storageDirectory = '';




  constructor(private route: ActivatedRoute,
              private artworkService: ArtworkService,
              private location: Location,
              public platform: Platform,
              private file: File,
              private transfer: FileTransfer,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController
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

  favoriteButton(){
      console.log('mi premi');
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
