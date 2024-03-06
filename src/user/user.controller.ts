import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';

import { CreateUserDto, UpdatePasswordDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) userId: string) {
    return this.userService.findOne(userId);
  }

  @Put(':id')
  updatePassword(@Param('id', ParseUUIDPipe) userId: string, @Body() dto: UpdatePasswordDto) {
    return this.userService.updatePassword(userId, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) userId: string) {
    return this.userService.remove(userId);
  }
}
