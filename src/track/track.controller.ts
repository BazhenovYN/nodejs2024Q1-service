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

import { CreateTrackDto, UpdateTrackDto } from './dto';
import { Track } from './entities';
import { TrackService } from './track.service';

@ApiTags('Tracks')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @ApiOperation({ summary: 'Add new track', description: 'Add new track information' })
  @ApiCreatedResponse({ type: Track, description: 'Successful operation' })
  @ApiBadRequestResponse({ description: 'Bad request. Body does not contain required fields' })
  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @ApiOperation({ summary: 'Get tracks list', description: 'Gets all library tracks list' })
  @ApiOkResponse({ type: [Track], description: 'Successful operation' })
  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @ApiOperation({ summary: 'Get single track by id', description: 'Get single track by id' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ type: Track, description: 'Successful operation' })
  @ApiBadRequestResponse({ description: 'Bad request. trackId is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: 'Track was not found' })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.trackService.findOne(id);
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
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTrackDto: UpdateTrackDto) {
    return this.trackService.update(id, updateTrackDto);
  }

  @ApiOperation({ summary: 'Delete track', description: 'Delete track from library' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({ description: 'Bad request. trackId is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: 'Track was not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.trackService.remove(id);
  }
}
