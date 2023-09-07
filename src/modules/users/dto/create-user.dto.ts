import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  user_name: string;

  @IsString()
  full_name: string;

  @IsString()
  password: string;
}
