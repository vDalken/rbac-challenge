import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import * as argon2 from 'argon2';
import { Base } from './base.entity';
import { Role } from './role.entity';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Entity()
export class User extends Base {
  @IsNotEmpty()
  @Column({ unique: true })
  username: string;

  @IsEmail()
  @Column({ unique: true })
  email: string;

  @IsNotEmpty()
  @Column()
  password: string;

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Array<Role>;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await argon2.hash(this.password);
    }
  }

  constructor(username: string, email: string, password: string) {
    super();
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
