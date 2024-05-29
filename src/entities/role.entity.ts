import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Base } from './base.entity';
import { Permission } from './permission.entity';

@Entity()
export class Role extends Base {
  @Column({ unique: true })
  name: string;

  @Column()
  description?: string;

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Array<Permission>;
}
