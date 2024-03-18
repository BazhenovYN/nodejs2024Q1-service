import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AlbumModule } from 'album/album.module';
import { ArtistModule } from 'artist/artist.module';
import { appConfig } from 'config';
import { FavoritesModule } from 'favorites/favorites.module';
import { TrackModule } from 'track/track.module';
import { UserModule } from 'user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
    }),
    UserModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavoritesModule,
    PrismaModule,
    LoggerModule,
  ],
})
export class AppModule {}
