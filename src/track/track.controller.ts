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

import { CreateTrackDto, UpdateTrackDto } from './dto';
import { Track } from './entities';
import { TrackService } from './track.service';

@ApiTags('Tracks')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Access token is missing or invalid' })
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @ApiOperation({ summary: 'Add new track', description: 'Add new track information' })
  @ApiCreatedResponse({ type: Track, description: 'Successful operation' })
  @ApiBadRequestResponse({ description: 'Bad request. Body does not contain required fields' })
  @Post()
  async create(@Body() createTrackDto: CreateTrackDto) {
    const track = await this.trackService.create(createTrackDto);
    return new Track(track);
  }

  @ApiOperation({ summary: 'Get tracks list', description: 'Gets all library tracks list' })
  @ApiOkResponse({ type: [Track], description: 'Successful operation' })
  @Get()
  async findAll() {
    const tracks = await this.trackService.findAll();
    return tracks.map((track) => new Track(track));
  }

  @ApiOperation({ summary: 'Get single track by id', description: 'Get single track by id' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ type: Track, description: 'Successful operation' })
  @ApiBadRequestResponse({ description: 'Bad request. trackId is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: 'Track was not found' })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const track = await this.trackService.findOne(id);
    return new Track(track);
  }

  @ApiOperation({
    summary: 'Update track information',
    description: 'Update library track information by UUID',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ type: Track, description: 'The track has been updated' })
  @ApiBadRequestResponse({ description: 'Bad request. trackId is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: 'Track was not found' })
  @Put(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTrackDto: UpdateTrackDto) {
    const track = await this.trackService.update(id, updateTrackDto);
    return new Track(track);
  }

  @ApiOperation({ summary: 'Delete track', description: 'Delete track from library' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({ description: 'Bad request. trackId is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: 'Track was not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const track = await this.trackService.remove(id);
    return new Track(track);
  }
}
