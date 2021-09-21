import {ArtworkImage} from './artworkImage.model';
import {Artist} from '../artist/artist.model';
import {ArtworkDimension} from './artworkDimension.model';

export class Artwork {
  id: string;
  _id: string;
  title: string;
  category: string;
  provenance: string;
  signature: string;
  literature: string;
  collecting_institution: string;
  medium: string;
  date: string;
  additional_information: string;

  artist: Artist;
  dimensions: ArtworkDimension;
  images: Array<ArtworkImage>; // Array?
}
