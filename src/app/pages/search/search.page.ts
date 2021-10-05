import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {SearchService} from '../../service/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  public value: string;

  constructor(private route: ActivatedRoute,
              private searchService: SearchService
              ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.value = params.get('value');
    });

    this.searchService.getSearch(this.value).subscribe((data) => {
      console.log(data);
    });
  }

}
