import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


const PopulartArtist = gql`
  query {
    popular_artists(size: 5) {
      artists {
        id
        name
      }
    }
  }
`;

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

  artists: any[];
  loading = true;
  error: any;

  constructor(private apollo: Apollo) {
  }

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: PopulartArtist,
      })
      .valueChanges.subscribe((result: any) => {
      console.log('result', result.data);
      this.artists = result.data.popular_artists.artists;
      console.log('Artists', this.artists);
      this.loading = result.loading;
      this.error = result.errors;
    });
  }

}
