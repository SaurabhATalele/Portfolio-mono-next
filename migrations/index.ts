import * as migration_20260604_040948_add_seo_fields from './20260604_040948_add_seo_fields';
import * as migration_20260604_061848_add_testimonials from './20260604_061848_add_testimonials';

export const migrations = [
  {
    up: migration_20260604_040948_add_seo_fields.up,
    down: migration_20260604_040948_add_seo_fields.down,
    name: '20260604_040948_add_seo_fields',
  },
  {
    up: migration_20260604_061848_add_testimonials.up,
    down: migration_20260604_061848_add_testimonials.down,
    name: '20260604_061848_add_testimonials'
  },
];
