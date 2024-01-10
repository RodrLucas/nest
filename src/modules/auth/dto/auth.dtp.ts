import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly username: string;

  @ApiProperty({
    description: 'Password must be at least 8 characters',
  })
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;
}
