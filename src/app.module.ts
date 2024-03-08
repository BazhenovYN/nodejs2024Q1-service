import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AlbumModule } from 'album/album.module';
import { ArtistModule } from 'artist/artist.module';
import { appConfig } from 'config';
import { DatabaseModule } from 'database/database.module';
import { FavoritesModule } from 'favorites/favorites.module';
import { TrackModule } from 'track/track.module';
import { UserModule } from 'user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
    }),
    UserModule,
    ArtistModule,
    DatabaseModule,
    TrackModule,
    AlbumModule,
    FavoritesModule,
  ],
})
export class AppModule {}
