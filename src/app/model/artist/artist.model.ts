import {ArtistImage} from './artistimage.model';

export interface  Artist {
  id: string;
  _id: string;
  name: string;
  years: string;
  birthday: string;
  nationality: string;
  blurb: string;
  image: ArtistImage;
}
