import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FavoritesService } from './favorites.service';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('artist/:id')
  addArtist(@Param('id', ParseUUIDPipe) artistId: string) {
    return this.favoritesService.addArtist(artistId);
  }

  @Post('album/:id')
  addAlbum(@Param('id', ParseUUIDPipe) albumId: string) {
    return this.favoritesService.addAlbum(albumId);
  }

  @Post('track/:id')
  addTrack(@Param('id', ParseUUIDPipe) trackId: string) {
    return this.favoritesService.addTrack(trackId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('artist/:id')
  deleteArtist(@Param('id', ParseUUIDPipe) artistId: string) {
    return this.favoritesService.deleteArtist(artistId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('album/:id')
  deleteAlbum(@Param('id', ParseUUIDPipe) albumId: string) {
    return this.favoritesService.deleteAlbum(albumId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('track/:id')
  deleteTrack(@Param('id', ParseUUIDPipe) trackId: string) {
    return this.favoritesService.deleteTrack(trackId);
  }
}
