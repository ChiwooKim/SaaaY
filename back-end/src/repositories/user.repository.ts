import { UserDto } from 'src/models/user.dto';
import { driver, executeQuery, stringify } from './connection-pools/neo4j.db';

export class UserRepository {
  findByEmail(email: string) {
    throw new Error('Method not implemented.');
  }

  async findByUsername(userName: string): Promise<UserDto> {
    return await executeQuery(
      `MATCH (user) WHERE user.username = '${userName}' RETURN user`,
    );
  }

  async createUser(userDto: UserDto): Promise<UserDto> {
    return await executeQuery(
      `create (user:User ${stringify(userDto)}) RETURN user`,
    );
  }
}
