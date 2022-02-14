import { Record, Result } from 'neo4j-driver';
import { ResourceError } from 'src/error/resource.error';
import { UserDto } from 'src/models/user.dto';
import { executeQuery, stringify } from './connection-pools/neo4j.db';

export class UserRepository {
  async updatePassword(userDto: UserDto): Promise<UserDto> {
    const result = await executeQuery<Record>(
      `match (user:User {email: '${userDto.email}'})
      set user.password = '${userDto.password}'
      RETURN user`,
    );
    if (result.length == 0) throw new ResourceError('이메일 없음');
    return result[0].get('user').properties;
  }
  async updateUser(userDto: UserDto): Promise<UserDto> {
    const result = await executeQuery<Record>(
      `match (user:User {email: '${userDto.email}'})
      set user.biography = '${userDto.biography}',
      user.username = '${userDto.username}'
      RETURN user`,
    );
    if (result.length == 0) throw new ResourceError('이메일 없음');
    return result[0].get('user').properties;
  }
  async findByEmail(email: string): Promise<UserDto> {
    const result = await executeQuery<Record>(
      `MATCH (user) WHERE user.email = '${email}' RETURN user`,
    );
    if (result.length == 0) throw new ResourceError('이메일 없음');
    const userDto: UserDto = result[0].get('user').properties;
    userDto.id = result[0].get('user').identity.low;
    return userDto;
  }

  async findByUsername(userName: string): Promise<UserDto[]> {
    const result = await executeQuery<Record>(
      `MATCH (user) WHERE user.username =~ '${userName}.*' RETURN user`,
    );
    return result.map((r) => r.get('user').properties);
  }

  async createUser(userDto: UserDto): Promise<UserDto> {
    const result = await executeQuery<Record>(
      `create (user:User ${stringify(userDto)}) RETURN user`,
    );
    return result[0].get('user').properties;
  }
}
