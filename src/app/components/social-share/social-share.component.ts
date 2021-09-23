import {Component, Input, OnInit} from '@angular/core';

import { ModalController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import {environment} from '../../../environments/environment.prod';
import {Artwork} from '../../model/artwork/artwork.model';

@Component({
  selector: 'app-social-share',
  templateUrl: './social-share.component.html',
  styleUrls: ['./social-share.component.scss'],
})
export class SocialShareComponent implements OnInit {

  public sharingList = environment.socialShareOption;
  loader: any = null;
  sharingText = 'Hand Art';
  emailSubject = 'example@example.it';
  recipent = [''];
  sharingImage: string;
  sharingUrl = '../../../assets/icon/icon.png';
  constructor(
    private modal: ModalController,
    private socialSharing: SocialSharing
  ) {
  }

  ngOnInit() {
  }
  closeModal() {
    this.modal.dismiss();
  }
  async shareVia(shareData) {
    if (shareData.shareType === 'viaEmail') {
      this.shareViaEmail();
    } else {
      this.socialSharing[`${shareData.shareType}`](this.sharingText, this.sharingImage, this.sharingUrl)
        .then((res) => {
          this.modal.dismiss();
        })
        .catch((e) => {
          console.log('error', e);
          this.modal.dismiss();
        });
    }
  }
  shareViaEmail() {
    this.socialSharing.canShareViaEmail().then((res) => {
      this.socialSharing.shareViaEmail(this.sharingText, this.emailSubject, this.recipent, null, null, this.sharingImage).then(() => {
        this.modal.dismiss();
      });
    }).catch((e) => {
      // Error!
    });
  }
}
