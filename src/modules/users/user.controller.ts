import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @Get(':user_id')
  async findOne(@Param('user_id') user_id: string): Promise<User> {
    const user = await this.usersService.findOne(user_id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Put(':user_id')
  async update(
    @Param('user_id') user_id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    const user = await this.usersService.update(user_id, updateUserDto);
    if (!user) {
      throw new NotFoundException('User not found');
    }
  }
}
