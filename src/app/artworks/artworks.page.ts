import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-artworks',
  templateUrl: './artworks.page.html',
  styleUrls: ['./artworks.page.scss'],
})
export class ArtworksPage implements OnInit {
  public categoryHome: any[] = [
    { name: 'Impressionist & Modern Art', src: '../../assets/home/category/modern.png' , url: '/'},
    { name: 'Contemporary Art', src: '../../assets/home/category/contemporaryart.jpg' , url: '/'},
    { name: 'Photography', src: '../../assets/home/category/photograph.png' , url: '/'},
    { name: 'Pre-20th Century', src: '../../assets/home/category/pre20th.png' , url: '/'},
    { name: 'Post War Art', src: '../../assets/home/category/postwar.png' , url: '/'},
    { name: 'Street Art', src: '../../assets/home/category/streetart.png' , url: '/'},
  ];

  constructor(private dataService: DataService) { }

  appo: any = [];
  opere: any = [];
  links: any = [];
  ngOnInit() {

    this.dataService.getArtworksData().subscribe(data => {
      // console.log(data);
      this.appo = data;
      this.opere = this.appo._embedded.artworks;
      this.links = this.appo._embedded.artworks._links;
      console.log(this.opere);                            // Recive artworks list, ok
      console.log(this.links);                            // Recive undefined
    });
  }

}
