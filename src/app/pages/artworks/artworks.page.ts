import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ArtworkService} from '../../service/artwork.service';

@Component({
  selector: 'app-artworks',
  templateUrl: './artworks.page.html',
  styleUrls: ['./artworks.page.scss'],
})
export class ArtworksPage implements OnInit {

  constructor(private artworkService: ArtworkService) { this.addMoreItems(); }

  private appo: any = []; // Variabili di appoggio
  private appo2: any = [];
  private numTimesLeft = 5;
  private offset = 20;
  public artworks: any = [];

  ngOnInit() {
    this.artworkService.getArtworksBySizeRest(20).subscribe(data => {
      this.appo = data;
      this.artworks = this.appo._embedded.artworks;
    });
  }

  loadData(event) {
    setTimeout(() => {
      // console.log('Done');
      this.addMoreItems();
      this.numTimesLeft -= 1;
      event.target.complete();
    }, 2000);
  }

  addMoreItems() {
    this.artworkService.getArtworksByOffsetRest(this.offset).subscribe(data => {
      this.appo = data;
      this.appo2 = this.appo._embedded.artworks;
      for (let i = 0; i < 5; i++){
        this.artworks.push(this.appo2[i]);
      }
      this.offset = this.offset + 5;
    });
  }
}
