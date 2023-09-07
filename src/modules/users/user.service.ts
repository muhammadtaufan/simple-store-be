import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    try {
      const savedUser = await this.usersRepository.save(user);
      return savedUser;
    } catch (error) {
      console.error('Error while saving user', error);
      throw new Error('Failed to save user');
    }
  }

  findOne(user_id: string): Promise<User> {
    return this.usersRepository.findOne({ where: { user_id: user_id } });
  }

  async update(user_id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { user_id: user_id },
    });
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${user_id} not found`);
    }
    return this.usersRepository.save({ ...existingUser, ...updateUserDto });
  }
}
