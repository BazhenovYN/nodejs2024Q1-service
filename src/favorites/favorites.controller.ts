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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { Favorites } from './entities';
import { FavoritesService } from './favorites.service';

@ApiTags('Favorites')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Access token is missing or invalid' })
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @ApiOperation({
    summary: 'Get all favorites',
    description: 'Gets all favorites artists, albums and tracks',
  })
  @ApiOkResponse({ type: Favorites, description: 'Successful operation' })
  @Get()
  async findAll() {
    const favorites = await this.favoritesService.findAll();
    return new Favorites(favorites);
  }

  @ApiOperation({
    summary: 'Add artist to the favorites',
    description: 'Add artist to the favorites',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ description: 'Added successfully' })
  @ApiBadRequestResponse({ description: 'Bad request. artistId is invalid (not uuid)' })
  @ApiUnprocessableEntityResponse({ description: "Artist with id doesn't exist" })
  @Post('artist/:id')
  async addArtist(@Param('id', ParseUUIDPipe) artistId: string) {
    await this.favoritesService.addArtist(artistId);
  }

  @ApiOperation({
    summary: 'Add album to the favorites',
    description: 'Add album to the favorites',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ description: 'Added successfully' })
  @ApiBadRequestResponse({ description: 'Bad request. albumId is invalid (not uuid)' })
  @ApiUnprocessableEntityResponse({ description: "Album with id doesn't exist" })
  @Post('album/:id')
  async addAlbum(@Param('id', ParseUUIDPipe) albumId: string) {
    await this.favoritesService.addAlbum(albumId);
  }

  @ApiOperation({
    summary: 'Add track to the favorites',
    description: 'Add track to the favorites',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ description: 'Added successfully' })
  @ApiBadRequestResponse({ description: 'Bad request. trackId is invalid (not uuid)' })
  @ApiUnprocessableEntityResponse({ description: "Track with id doesn't exist" })
  @Post('track/:id')
  async addTrack(@Param('id', ParseUUIDPipe) trackId: string) {
    await this.favoritesService.addTrack(trackId);
  }

  @ApiOperation({
    summary: 'Delete artist from favorites',
    description: 'Delete artist from favorites',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({ description: 'Bad request. artistId is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: 'Artist was not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('artist/:id')
  async deleteArtist(@Param('id', ParseUUIDPipe) artistId: string) {
    await this.favoritesService.deleteArtist(artistId);
  }

  @ApiOperation({
    summary: 'Delete album from favorites',
    description: 'Delete album from favorites',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({ description: 'Bad request. albumId is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: 'Album was not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('album/:id')
  async deleteAlbum(@Param('id', ParseUUIDPipe) albumId: string) {
    await this.favoritesService.deleteAlbum(albumId);
  }

  @ApiOperation({
    summary: 'Delete track from favorites',
    description: 'Delete track from favorites',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({ description: 'Bad request. trackId is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: 'Track was not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('track/:id')
  async deleteTrack(@Param('id', ParseUUIDPipe) trackId: string) {
    await this.favoritesService.deleteTrack(trackId);
  }
}
