import { Component, OnInit } from '@angular/core';
import {ArtistService} from '../../service/artist.service';
import {Artist} from '../../model/artist/artist.model';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.page.html',
  styleUrls: ['./artists.page.scss'],
})
export class ArtistsPage implements OnInit {

  constructor(private artistService: ArtistService) { }

  public artists: Array<Artist>;

  ngOnInit() {
    this.artistService.getPopularArtistGraph(100).subscribe(data => {
      this.artists = data;
    });
  }
}



