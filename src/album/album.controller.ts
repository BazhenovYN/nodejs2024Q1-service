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
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { AlbumService } from './album.service';
import { CreateAlbumDto, UpdateAlbumDto } from './dto';
import { Album } from './entities';

@ApiTags('Albums')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @ApiOperation({ summary: 'Add new album', description: 'Add new album information' })
  @ApiCreatedResponse({ type: Album, description: 'Album is created' })
  @ApiBadRequestResponse({ description: 'Bad request. Body does not contain required fields' })
  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @ApiOperation({ summary: 'Get albums list', description: 'Gets all library albums list' })
  @ApiOkResponse({ type: [Album], description: 'Successful operation' })
  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @ApiOperation({ summary: 'Get single album by id', description: 'Get single album by id' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ type: Album, description: 'Successful operation' })
  @ApiBadRequestResponse({ description: 'Bad request. albumId is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: 'Album was not found' })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.findOne(id);
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
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumService.update(id, updateAlbumDto);
  }

  @ApiOperation({ summary: 'Delete album', description: 'Delete album from library' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({ description: 'Bad request. albumId is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: 'Album was not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.remove(id);
  }
}
