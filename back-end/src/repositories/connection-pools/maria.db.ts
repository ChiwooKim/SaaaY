import mariadb from 'mariadb';
import mariadb_config from '../../config/mariadb-config.json';
export const pool = mariadb.createPool(mariadb_config);
