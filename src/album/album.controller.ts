import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AlbumService } from './album.service';
import { CreateAlbumDto, UpdateAlbumDto } from './dto';
import { Album } from './entities';

@ApiTags('Albums')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Access token is missing or invalid' })
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @ApiOperation({ summary: 'Add new album', description: 'Add new album information' })
  @ApiCreatedResponse({ type: Album, description: 'Album is created' })
  @ApiBadRequestResponse({ description: 'Bad request. Body does not contain required fields' })
  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    const album = await this.albumService.create(createAlbumDto);
    return new Album(album);
  }

  @ApiOperation({ summary: 'Get albums list', description: 'Gets all library albums list' })
  @ApiOkResponse({ type: [Album], description: 'Successful operation' })
  @Get()
  async findAll() {
    const albums = await this.albumService.findAll();
    return albums.map((album) => new Album(album));
  }

  @ApiOperation({ summary: 'Get single album by id', description: 'Get single album by id' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ type: Album, description: 'Successful operation' })
  @ApiBadRequestResponse({ description: 'Bad request. albumId is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: 'Album was not found' })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const album = await this.albumService.findOne(id);
    return new Album(album);
  }

  @ApiOperation({
    summary: 'Update album information',
    description: 'Update library album information by UUID',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ type: Album, description: 'The album has been updated' })
  @ApiBadRequestResponse({ description: 'Bad request. albumId is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: 'Album was not found' })
  @Put(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    const album = await this.albumService.update(id, updateAlbumDto);
    return new Album(album);
  }

  @ApiOperation({ summary: 'Delete album', description: 'Delete album from library' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({ description: 'Bad request. albumId is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: 'Album was not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const album = await this.albumService.remove(id);
    return new Album(album);
  }
}
