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

  private sanitizeUser(user: User): Partial<User> {
    const { password, created_at, updated_at, ...sanitizedUser } = user;
    return sanitizedUser;
  }

  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    const user = this.usersRepository.create(createUserDto);
    try {
      const savedUser = await this.usersRepository.save(user);
      return this.sanitizeUser(savedUser);
    } catch (error) {
      console.error('Error while saving user', error);
      throw new Error('Failed to save user');
    }
  }

  findOne(user_id: string): Promise<Partial<User>> {
    return this.usersRepository
      .findOne({ where: { user_id: user_id } })
      .then((user) => this.sanitizeUser(user));
  }

  async update(
    user_id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<Partial<User>> {
    const existingUser = await this.usersRepository.findOne({
      where: { user_id: user_id },
    });
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${user_id} not found`);
    }
    const updatedUser = await this.usersRepository.save({
      ...existingUser,
      ...updateUserDto,
    });
    return this.sanitizeUser(updatedUser);
  }
}
