import { uri, user, password } from '../../config/db-config.json';
import neo4j from 'neo4j-driver';
export function driver() {
  return neo4j.driver(uri, neo4j.auth.basic(user, password));
}
