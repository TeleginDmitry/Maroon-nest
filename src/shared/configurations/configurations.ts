const configurations = {
    db_connection: process.env.DB_CONNECTION,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    db_host: process.env.DB_HOST,
    db_port: process.env.DB_PORT,
    db_database: process.env.DB_DATABASE,
    db_schema: process.env.DB_SCHEMA,
    port: process.env.PORT,
    secret_jwt: process.env.SECRET_JWT,
    expire_access_token: process.env.EXPIRE_ACCESS_JWT,
    expire_refresh_token: process.env.EXPIRE_REFRESH_JWT
}

export function selectConfiguration(
    configuration: keyof typeof configurations
) {
    return configurations[configuration]
}
