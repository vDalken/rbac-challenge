import { DataSource } from 'typeorm';
import { Seeder, runSeeder } from 'typeorm-extension';
import { PermissionSeeder } from './permission.seeder';
import { RoleSeeder } from './role.seeder';

export class MainSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    await runSeeder(dataSource, PermissionSeeder);
    await runSeeder(dataSource, RoleSeeder);
  }
}
