import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser({ username, password }: AuthPayloadDto) {
    const user = await this.usersRepository.findOneBy({ username }); //shorthand for {username: username}
    console.log(user);
    if (!user) return null;

    const isPasswordValid = await argon2.verify(user.password, password);

    if (isPasswordValid) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...toBeSentUser } = user;
      return this.jwtService.sign(toBeSentUser);
    }
  }
}
