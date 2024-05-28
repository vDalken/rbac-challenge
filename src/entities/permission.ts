import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity()
export class Permission extends Base {
  @Column({ unique: true })
  name: string;

  @Column()
  description?: string;
}
