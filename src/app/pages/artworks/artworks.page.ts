import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ArtworkService} from '../../service/artwork.service';

@Component({
  selector: 'app-artworks',
  templateUrl: './artworks.page.html',
  styleUrls: ['./artworks.page.scss'],
})
export class ArtworksPage implements OnInit {

  constructor(private artworkService: ArtworkService) { }

  appo: any = [];
  artworks: any = [];
  image: any = [];

  ngOnInit() {
    this.artworkService.getArtworksBySizeRest(10).subscribe(data => {
      this.appo = data;
      this.artworks = this.appo._embedded.artworks;
    });
  }

}
