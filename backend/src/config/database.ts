import { Sequelize } from 'sequelize';
import { config } from './env';

export const sequelize = new Sequelize(config.DB_URL, {
  dialect: 'postgres'as const,
  logging: config.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};

if (config.NODE_ENV === 'development') {
  sequelize.sync({ alter: true }).then(() => {
    console.log('✅ Database synchronized (development mode)');
  });
}

if (config.NODE_ENV === 'production') {
  sequelize.sync().then(() => {
    console.log('✅ Database synchronized (production mode)');
  });
}

if (config.NODE_ENV === 'test') {
  sequelize.sync({ force: true }).then(() => {
    console.log('✅ Database synchronized (test mode)');
  });
}

if (config.NODE_ENV === 'staging') {
  sequelize.sync({ alter: true }).then(() => {
    console.log('✅ Database synchronized (staging mode)');
  });
}

if (config.NODE_ENV === 'ci') {
  sequelize.sync({ force: true }).then(() => {
    console.log('✅ Database synchronized (CI mode)');
  });
}

if (!config.DB_URL) {
  throw new Error('DATABASE_URL is missing in .env');
}