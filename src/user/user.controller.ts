import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { CreateUserDto, UpdatePasswordDto } from './dto';
import { User } from './entities';
import { UserService } from './user.service';

@ApiTags('Users')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create user', description: 'Create a new user' })
  @ApiCreatedResponse({ type: User, description: 'The user has been created' })
  @ApiBadRequestResponse({ description: 'Bad request. Body does not contain required fields' })
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @ApiOperation({ summary: 'Get all users', description: 'Get all users' })
  @ApiOkResponse({ type: [User], description: 'Successful operation' })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Get single user by id', description: 'Get single user by id' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ type: User, description: 'Successful operation' })
  @ApiBadRequestResponse({ description: 'Bad request. userId is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: 'User was not found' })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }

  @ApiOperation({
    summary: "Update a user's password",
    description: "Updates a user's password by ID",
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ type: User, description: 'The user has been updated' })
  @ApiBadRequestResponse({ description: 'Bad request. userId is invalid (not uuid)' })
  @ApiForbiddenResponse({ description: 'oldPassword is wrong' })
  @ApiNotFoundResponse({ description: 'User was not found' })
  @Put(':id')
  updatePassword(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdatePasswordDto) {
    return this.userService.updatePassword(id, dto);
  }

  @ApiOperation({ summary: 'Delete user', description: 'Deletes user by ID' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiNoContentResponse({ description: 'The user has been deleted' })
  @ApiBadRequestResponse({ description: 'Bad request. userId is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: 'User was not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.remove(id);
  }
}
