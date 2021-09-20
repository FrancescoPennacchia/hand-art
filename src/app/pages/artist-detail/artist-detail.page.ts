import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.page.html',
  styleUrls: ['./artist-detail.page.scss'],
})
export class ArtistDetailPage implements OnInit {

  private idArtist: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('vaffanculo');
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idArtist = params.get('id');
    });
    console.log(this.idArtist);
  }

}
