
import { graphql } from 'graphql';
import { schema } from './schemaWithdb';
const _ = require('lodash');

/**
 * Description : 
 */

export class graphqlAppId {

    public static getAppId(event: any, callback: any) {
        console.log('graphqlAppId: ',event.body)
        if (!_.get(event, 'body.query')) return callback({message:'Missing body.query object',statusCode:'422'});
        const query: any = event.body.query;
        console.log('data: ',query)
        graphql(schema, query).then((result: any) => {

            if (!result.errors)
                callback(undefined, result);
            else
                callback({});
        }).catch((error)=>{
            console.log('error ',JSON.stringify(error));
            callback(error)
        })
    }
}  
