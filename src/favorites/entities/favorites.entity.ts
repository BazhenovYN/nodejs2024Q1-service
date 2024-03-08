import { Album } from 'album/entities';
import { Artist } from 'artist/entities';
import { Track } from 'track/entities';

export class Favorites {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
