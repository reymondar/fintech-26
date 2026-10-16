import * as migration_20261016_084448_initial_payload from './20261016_084448_initial_payload';
import * as migration_20261016_095244_editorial_tools from './20261016_095244_editorial_tools';

export const migrations = [
  {
    up: migration_20261016_084448_initial_payload.up,
    down: migration_20261016_084448_initial_payload.down,
    name: '20261016_084448_initial_payload',
  },
  {
    up: migration_20261016_095244_editorial_tools.up,
    down: migration_20261016_095244_editorial_tools.down,
    name: '20261016_095244_editorial_tools'
  },
];
