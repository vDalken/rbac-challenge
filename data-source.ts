import { SeederOptions } from 'typeorm-extension';
import { Permission } from './src/entities/permission.entity';
import { Role } from './src/entities/role.entity';
import { User } from './src/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { MainSeeder } from './src/seeds/main.seeder';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: 'database',
  port: 5432,
  database: 'database',
  username: 'postgres',
  password: '12345',
  migrations: ['migrations/**'],
  entities: [User, Role, Permission],
  synchronize: false,
  migrationsTableName: 'migrations_table',
  seeds: [MainSeeder],
};

export const DatabaseSource = new DataSource(options);
