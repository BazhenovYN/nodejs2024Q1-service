import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ArtistModule } from './artist/artist.module';
import { configuration } from './config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    UserModule,
    ArtistModule,
    DatabaseModule,
  ],
})
export class AppModule {}
