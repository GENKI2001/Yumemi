import '@testing-library/jest-dom';
import { TextDecoder, TextEncoder } from 'util';

Object.assign(global, { TextDecoder, TextEncoder });

import { config } from 'dotenv';
config();
