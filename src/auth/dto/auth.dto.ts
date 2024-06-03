import { IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthPayloadDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 20)
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
