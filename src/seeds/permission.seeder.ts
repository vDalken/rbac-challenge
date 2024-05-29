import { Permission } from '../entities/permission.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export class PermissionSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const permissionRepository = dataSource.getRepository(Permission);

    const permissions = [
      { name: 'read', description: 'Read permission' },
      { name: 'write', description: 'Write permission' },
    ];

    await permissionRepository.save(permissions);
  }
}
