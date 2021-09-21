import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Artist} from '../../model/artist/artist.model';
import {ArtistService} from '../../service/artist.service';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.page.html',
  styleUrls: ['./artist-detail.page.scss'],
})
export class ArtistDetailPage implements OnInit {

  private idArtist: string;
  public artist: Artist;

  constructor(private route: ActivatedRoute,
              private artistService: ArtistService,
              private location: Location
              ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idArtist = params.get('id');
    });

    this.artistService.getArtistByIdGraph(this.idArtist).subscribe(res => {
      this.artist = res;
      // this.artist.image.url = this.artist.image.url.replace('tall', 'large');
      // console.log (this.artist.image.url );
    });
  }

  lastPage(){
      this.location.back();
  }

  favoriteButton(){

  }

}
