import { Component, OnInit } from '@angular/core';
import {ArtistService} from '../../service/artist.service';
import {Observable} from 'rxjs';
import {Artist} from '../../model/artist/artist.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {URL} from '../../constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public categoryHome: any[] = [
    { name: 'Impressionist & Modern Art', src: '../../assets/home/category/modern.png' , url: '/'},
    { name: 'Contemporary Art', src: '../../assets/home/category/contemporaryart.jpg' , url: '/'},
    { name: 'Photography', src: '../../assets/home/category/photograph.png' , url: '/'},
    { name: 'Pre-20th Century', src: '../../assets/home/category/pre20th.png' , url: '/'},
    { name: 'Post War Art', src: '../../assets/home/category/postwar.png' , url: '/'},
    { name: 'Street Art', src: '../../assets/home/category/streetart.png' , url: '/'},
  ];

  artists: any;
  loading = true;
  error: any;

  constructor(private artistiService: ArtistService, private http: HttpClient) {
  }

  ngOnInit() {

   const ciao = this.artistiService.getPopularArtistGraph(10);
   console.log(ciao);

  }

}
