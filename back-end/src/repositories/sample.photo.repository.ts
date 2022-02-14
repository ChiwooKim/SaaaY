import { TestPhoto } from 'src/entity/samplephoto.entity';
import { TestUser } from 'src/entity/sampleuser.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(TestPhoto)
export class PhotoRepository extends Repository<TestUser> {}
