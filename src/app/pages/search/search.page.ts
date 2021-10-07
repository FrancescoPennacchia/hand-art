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
  private appo: string;
  public result_appo: any[];
  public result: any[];

  constructor(private route: ActivatedRoute,
              private searchService: SearchService
              ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.value = params.get('value');
    });

    this.appo = this.value.replace(' ', '+');

    this.searchService.getSearch(this.appo).subscribe((data) => {
      this.result_appo = data._embedded.results;
      console.log(this.result_appo);
      this.result = this.result_appo;
    });
  }

}
