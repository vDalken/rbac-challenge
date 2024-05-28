import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Base } from './base.entity';
import { User } from './user.entity';

@Entity()
export class Role extends Base {
  @Column({ unique: true })
  name: string;

  @Column()
  description?: string;

  @ManyToMany(() => User)
  @JoinTable()
  users: Array<User>;
}
