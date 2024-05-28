import { Column, Entity } from 'typeorm';

@Entity()
export class Permission {
  @Column({ unique: true })
  name: string;

  @Column()
  description?: string;
}
