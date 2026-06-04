import * as migration_20260604_040948_add_seo_fields from './20260604_040948_add_seo_fields';

export const migrations = [
  {
    up: migration_20260604_040948_add_seo_fields.up,
    down: migration_20260604_040948_add_seo_fields.down,
    name: '20260604_040948_add_seo_fields'
  },
];
