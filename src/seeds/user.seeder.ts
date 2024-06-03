import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export class UserSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const usersRepository = dataSource.getRepository(User);
    const roleRepository = dataSource.getRepository(Role);

    // fetching the admin role
    const adminRole: Role = await roleRepository.findOne({
      where: { name: 'Admin' },
    });

    const user = new User('supertux', 'fabiogoncalvesk2001@gmail.com', '123');
    user.roles = [adminRole];
    await usersRepository.save(user);
  }
}
