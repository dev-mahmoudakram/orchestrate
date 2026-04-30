type MysqlAdapterConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  connectionLimit: number;
  allowPublicKeyRetrieval: boolean;
};

export function getDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required.");
  }

  return databaseUrl;
}

export function getMysqlAdapterConfig(): MysqlAdapterConfig {
  const databaseUrl = new URL(getDatabaseUrl());

  if (databaseUrl.protocol !== "mysql:" && databaseUrl.protocol !== "mariadb:") {
    throw new Error("DATABASE_URL must use mysql:// or mariadb:// for the MySQL setup.");
  }

  const database = databaseUrl.pathname.replace(/^\//, "");

  if (!database) {
    throw new Error("DATABASE_URL must include a database name.");
  }

  return {
    host: databaseUrl.hostname,
    port: databaseUrl.port ? Number(databaseUrl.port) : 3306,
    user: decodeURIComponent(databaseUrl.username),
    password: decodeURIComponent(databaseUrl.password),
    database,
    connectionLimit: 5,
    allowPublicKeyRetrieval: true,
  };
}
