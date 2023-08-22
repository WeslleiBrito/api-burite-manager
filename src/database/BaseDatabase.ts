import knex from 'knex'

export class BaseDatabase {

    public connection = knex(
        {
            client: 'mysql',
            connection: {
                host: '192.168.0.112',
                user: 'burite',
                password: 'burite123',
                database: 'clarionerp',
                port: 3307
        }}
    )

}