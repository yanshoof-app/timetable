import { config } from 'dotenv';
import { join } from 'path';

before(async () => {
  config({ path: join(__dirname, '.env.test') });
});
