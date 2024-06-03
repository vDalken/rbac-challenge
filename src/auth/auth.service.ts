import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser({ username, password }: AuthPayloadDto) {
    const user = await this.usersRepository.findOneBy({ username }); //shorthand for {username: username}
    if (!user) return null;

    const isPasswordValid = await argon2.verify(user.password, password);

    if (isPasswordValid) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...toBeSentInfo } = user;
      return this.jwtService.sign(toBeSentInfo);
    }
  }

  async signup(signUpDto: SignUpDto) {
    const user = new User(
      signUpDto.username,
      signUpDto.email,
      signUpDto.password,
    );

    let savedUser;

    try {
      savedUser = await this.usersRepository.save(user);
    } catch (error) {
      this.handleDatabaseError(error);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...toBeSentInfo } = savedUser;

    return this.jwtService.sign(toBeSentInfo);
  }

  private handleDatabaseError(error: any): void {
    if (error.code === '23505') {
      // Unique constraint violation error code
      const errorMessage = this.getUniqueConstraintErrorMessage(error.detail);
      throw new ConflictException(errorMessage);
    }

    throw new InternalServerErrorException('Failed to register user');
  }

  private getUniqueConstraintErrorMessage(detail: string): string {
    if (detail.includes('username')) return 'Username is already taken';

    if (detail.includes('email')) return 'Email is already taken';

    return 'Unique constraint violation';
  }
}
