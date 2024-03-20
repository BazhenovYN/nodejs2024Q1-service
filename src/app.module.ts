import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AlbumModule } from 'album/album.module';
import { ArtistModule } from 'artist/artist.module';
import { appConfig } from 'config';
import { FavoritesModule } from 'favorites/favorites.module';
import { LoggerMiddleware } from 'logger/logger.middleware';
import { LoggerModule } from 'logger/logger.module';
import { PrismaModule } from 'prisma/prisma.module';
import { TrackModule } from 'track/track.module';
import { UserModule } from 'user/user.module';
import { AuthModule } from './auth/auth.module';

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
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
