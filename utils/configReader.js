import fs from 'fs';
import path from 'path';
import logger from './logger';

const env = process.env.TEST_ENV || 'qa';

const configPath = path.resolve(`config/${env}.json`);

const config = JSON.parse(
  fs.readFileSync(configPath, 'utf-8')
);

logger.info(`Environment loaded: ${config.env}`);

export default config;