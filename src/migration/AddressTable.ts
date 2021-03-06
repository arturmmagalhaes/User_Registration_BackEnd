import { BaseDatabase } from "../database/base/BaseDatabase";

export class AddressTable extends BaseDatabase {

    private static TABLE_NAME = 'Address';

    public async createTable() {
        try{
            await super.getConnection().raw(`
                CREATE TABLE IF NOT EXISTS ${AddressTable.TABLE_NAME}(
                    id VARCHAR(255) PRIMARY KEY,
                    cep VARCHAR(255),
                    street VARCHAR(255), 
                    number VARCHAR(255), 
                    complement VARCHAR(255), 
                    city VARCHAR(255), 
                    state VARCHAR(255),
                    id_user VARCHAR(255) NOT NULL,
                    FOREIGN KEY (id_user) REFERENCES UserProvi(id)
                )
            `);
        } catch(error) {
            throw new Error (error.message);
        } finally {
            await super.destroyConnection();
        }
    }
}