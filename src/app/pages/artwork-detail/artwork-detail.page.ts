import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ArtworkService} from '../../service/artwork.service';
import {Artwork} from '../../model/artwork/artwork.model';

@Component({
  selector: 'app-artwork-detail',
  templateUrl: './artwork-detail.page.html',
  styleUrls: ['./artwork-detail.page.scss'],
})
export class ArtworkDetailPage implements OnInit {

  private idArtwork: string;
  public artwork: Artwork;

  constructor(private route: ActivatedRoute,
              private artworkService: ArtworkService,
              private location: Location
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idArtwork = params.get('id');
      console.log(this.idArtwork);
    });

    this.artworkService.getArtworkByIdGraph(this.idArtwork).subscribe(res => {
      this.artwork = res;
    });
    // console.log(this.artwork);
  }

  lastPage(){
    this.location.back();
  }

  favoriteButton(){

  }

}
