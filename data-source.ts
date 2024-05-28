import { Permission } from './src/entities/permission';
import { Role } from './src/entities/role.entity';
import { User } from './src/entities/user.entity';
import { DataSource } from 'typeorm';

export const DatabaseSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'rbac_challenge_db',
  username: 'postgres',
  password: '12345',
  migrations: ['migrations/**'],
  entities: [User, Role, Permission],
  synchronize: false,
  migrationsTableName: 'migrations_table',
});
