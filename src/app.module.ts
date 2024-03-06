import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configuration } from './config';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    UserModule,
    ArtistModule,
  ],
})
export class AppModule {}
