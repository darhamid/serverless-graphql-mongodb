/**
 * Import npm module
 */

const dbConnectionUrl = 'mongodb://127.0.0.1:27017/';
const dbName="appdb"
const MongoClient = require('mongodb').MongoClient;
let locator = new Map();

export class DbConnect {

    public static dbConnect(callback): void {

        MongoClient.connect(dbConnectionUrl + dbName, (error, db) => {
            if (error) {
                console.log('Database connection error occur!', JSON.stringify(error));
                callback(error,null)
            }
            else {
                console.log('Database connected!');
                callback(null,db);
            }
        });
    }
}
