import { Permission } from '../entities/permission.entity';
import { Role } from '../entities/role.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export class RoleSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const roleRepository = dataSource.getRepository(Role);
    const permissionRepository = dataSource.getRepository(Permission);

    const readPermission = await permissionRepository.findOne({
      where: { name: 'read' },
    });

    const writePermission = await permissionRepository.findOne({
      where: { name: 'write' },
    });

    const roles = [
      {
        name: 'Admin',
        description: 'Administrator role',
        permissions: [readPermission, writePermission],
      },
      {
        name: 'User',
        description: 'User role',
        permissions: [readPermission],
      },
    ];

    await roleRepository.save(roles);
  }
}
