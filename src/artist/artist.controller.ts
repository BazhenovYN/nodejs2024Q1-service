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

import { ArtistService } from './artist.service';
import { CreateArtistDto, UpdateArtistDto } from './dto';
import { Artist } from './entities';

@ApiTags('Artists')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @ApiOperation({ summary: 'Add new artist', description: 'Add new artist' })
  @ApiCreatedResponse({ type: Artist, description: 'Successful operation' })
  @ApiBadRequestResponse({ description: 'Bad request. Body does not contain required fields' })
  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @ApiOperation({ summary: 'Get all artists', description: 'Get all artists' })
  @ApiOkResponse({ type: [Artist], description: 'Successful operation' })
  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @ApiOperation({ summary: 'Get single artist by id', description: 'Get single artist by id' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ type: Artist, description: 'Successful operation' })
  @ApiBadRequestResponse({ description: 'Bad request. artistId is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: 'Artist was not found' })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update artist information',
    description: 'Update artist information by UUID',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ type: Artist, description: 'The artist has been updated' })
  @ApiBadRequestResponse({ description: 'Bad request. artistId is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: 'Artist was not found' })
  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateArtistDto: UpdateArtistDto) {
    return this.artistService.update(id, updateArtistDto);
  }

  @ApiOperation({ summary: 'Delete artist', description: 'Delete artist from library' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({ description: 'Bad request. artistId is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: 'Artist was not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistService.remove(id);
  }
}
