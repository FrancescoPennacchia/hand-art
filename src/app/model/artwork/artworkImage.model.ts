import {Artist} from '../artist/artist.model';
import {ArtworkDimension} from './artworkDimension.model';

export class ArtworkImage {
  id: string;
  image_url: string;
  is_default: string;
  original_height: string;
  original_width: string;
  aspect_ratio: string;
  max_tiled_height: string;
  max_tiled_width: string;
  tile_size: string;
  tile_base_url: string;
  tile_format: string;

  artist: Artist;
  dimensions: ArtworkDimension;
  images: ArtworkImage; // Array?
}
