import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


const Category = gql`
  query {
    marketingCollections (size: 4){
      category
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
        query: Category,
      })
      .valueChanges.subscribe((result: any) => {
      console.log('result', result.data);
      this.data = result.data.marketingCollections;
      this.loading = result.loading;
      this.error = result.errors;
    });
  }


}
