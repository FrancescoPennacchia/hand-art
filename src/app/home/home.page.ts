import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


const PopulartArtist = gql`
  query {
    popular_artists(size: 5) {
      artists {
        name
        artworks {
          title
        }
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
  data: any[];
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
      this.data = result.data.popular_artists;
      this.loading = result.loading;
      this.error = result.errors;
    });
  }


}
