import { createConnection, getConnectionOptions, Connection } from 'typeorm';

async function execute(name = 'default'): Promise<Connection> {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      name,
      database:
        process.env.NODE_ENV === 'test'
          ? process.env.POSTGRES_DATABASE_TEST
          : defaultOptions.database,
    }),
  );
}

execute();

// import { createConnection } from 'typeorm';

// createConnection();
