// jest.setup.ts
import '@testing-library/jest-dom';
import dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(__dirname, '__tests__/.env.test') });
