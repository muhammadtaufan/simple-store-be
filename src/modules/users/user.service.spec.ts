import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;

  const mockRepository = {
    find: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue(new User()),
    save: jest.fn().mockResolvedValue(new User()),
    update: jest.fn().mockResolvedValue(new User()),
    create: jest.fn().mockResolvedValue(new User()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto = new CreateUserDto();
    createUserDto.user_name = 'TestUser';
    createUserDto.full_name = 'Test User';
    createUserDto.password = 'password';

    const user = new User();
    user.user_name = createUserDto.user_name;
    user.full_name = createUserDto.full_name;
    user.password = createUserDto.password;

    mockRepository.create.mockReturnValue(user);
    mockRepository.save.mockResolvedValue(user);

    expect(await service.create(createUserDto)).toEqual(user);
    expect(mockRepository.create).toHaveBeenCalledWith(createUserDto);
    expect(mockRepository.save).toHaveBeenCalledWith(user);
  });

  it('should find one user', async () => {
    const user = new User();
    const uuid = '123e4567-e89b-12d3-a456-426614174000';
    expect(await service.findOne(uuid)).toEqual(user);
    expect(mockRepository.findOne).toHaveBeenCalledWith({
      where: { user_id: uuid },
    });
  });

  it('should update a user', async () => {
    const updateUserDto = new UpdateUserDto();
    updateUserDto.full_name = 'Test User';
    updateUserDto.password = 'password';
    updateUserDto.user_name = 'testuser';
    const uuid = '123e4567-e89b-12d3-a456-426614174000';

    const existingUser = new User();
    existingUser.user_id = uuid;
    mockRepository.findOne.mockResolvedValue(existingUser);

    await service.update(uuid, updateUserDto);
    expect(mockRepository.save).toHaveBeenCalledWith({
      ...existingUser,
      ...updateUserDto,
    });
  });

  it('should throw an error when trying to update a non-existing user', async () => {
    const updateUserDto = new UpdateUserDto();
    updateUserDto.full_name = 'Test User';
    updateUserDto.password = 'password';
    updateUserDto.user_name = 'testuser';
    const uuid = '123e4567-e89b-12d3-a456-426614174000';
    mockRepository.findOne.mockResolvedValue(null);

    await expect(service.update(uuid, updateUserDto)).rejects.toThrow();
  });
});
