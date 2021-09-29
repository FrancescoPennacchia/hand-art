import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ArtworkService} from '../../service/artwork.service';

@Component({
  selector: 'app-artworks-category',
  templateUrl: './artworks-category.page.html',
  styleUrls: ['./artworks-category.page.scss'],
})
export class ArtworksCategoryPage implements OnInit {
  private nomeCat: string;

  private appo: any = []; // Variabili di appoggio
  public artworks: any = [];

  constructor(private route: ActivatedRoute,
              private artworkService: ArtworkService
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.nomeCat = params.get('cat');
      // console.log(this.nomeCat);
    });

    this.artworkService.getArtworkByGenes(50, this.nomeCat).subscribe(data => {
      this.appo = data;
      this.artworks = this.appo._embedded.artworks;
      // console.log(data);
      // console.log(this.artworks);
    });
  }


}
