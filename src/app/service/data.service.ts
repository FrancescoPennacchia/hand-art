import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: "root"
})

export class DataService {
  constructor(private http: HttpClient) {}


  getArtworksData(){
    return this.http.get("https://api.artsy.net/api/artworks?size=11", { headers: new HttpHeaders({
        'X-XAPP-Token': 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsInN1YmplY3RfYXBwbGljYXRpb24iOiI1ZmIxNDBiN2ZjMmM3MjAwMGVhMTQxMDAiLCJleHAiOjE2MjU0MzA0OTIsImlhdCI6MTYyNDgyNTY5MiwiYXVkIjoiNWZiMTQwYjdmYzJjNzIwMDBlYTE0MTAwIiwiaXNzIjoiR3Jhdml0eSIsImp0aSI6IjYwZDhkZjVjNjllOWJlMDAwZTAyYmViYSJ9.M8PdgsDcmxlI6Ay2GNHLsWazsNO53xaimnduoigSaVA'
      }) });
  }
}
