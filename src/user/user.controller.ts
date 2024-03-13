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
  async create(@Body() dto: CreateUserDto) {
    const user = await this.userService.create(dto);
    return new User(user);
  }

  @ApiOperation({ summary: 'Get all users', description: 'Get all users' })
  @ApiOkResponse({ type: [User], description: 'Successful operation' })
  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return users.map((user) => new User(user));
  }

  @ApiOperation({ summary: 'Get single user by id', description: 'Get single user by id' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ type: User, description: 'Successful operation' })
  @ApiBadRequestResponse({ description: 'Bad request. userId is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: 'User was not found' })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userService.findOne(id);
    return new User(user);
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
  async updatePassword(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdatePasswordDto) {
    const user = await this.userService.updatePassword(id, dto);
    return new User(user);
  }

  @ApiOperation({ summary: 'Delete user', description: 'Deletes user by ID' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiNoContentResponse({ description: 'The user has been deleted' })
  @ApiBadRequestResponse({ description: 'Bad request. userId is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: 'User was not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userService.remove(id);
    return new User(user);
  }
}
