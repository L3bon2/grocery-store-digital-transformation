import dotenv from 'dotenv';

dotenv.config();

export const config = {
  PORT: parseInt(process.env.PORT || '5000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_URL: process.env.DATABASE_URL || '',
  JWT_SECRET: process.env.JWT_SECRET || '',
  STRIPE_KEY: process.env.STRIPE_SECRET_KEY || '',
  REDIS_URL: process.env.REDIS_URL || '',
  SMTP_USER: process.env.SMTP_USER || '',
  SMTP_PASS: process.env.SMTP_PASS || '',
};

if (!config.DB_URL) {
  throw new Error('DATABASE_URL is missing in .env');
}

if (!config.JWT_SECRET) {
  throw new Error('JWT_SECRET is missing in .env');
}

if (!config.STRIPE_KEY) {
  throw new Error('STRIPE_SECRET_KEY is missing in .env');
}

if (!config.REDIS_URL) {
  throw new Error('REDIS_URL is missing in .env');
}

if (!config.SMTP_USER) {
  throw new Error('SMTP_USER is missing in .env');
}

if (!config.SMTP_PASS) {
  throw new Error('SMTP_PASS is missing in .env');
}